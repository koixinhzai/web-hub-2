// Rewired ở Phase 4: gọi API hợp nhất của web_hub (`/api/businesses`, filter
// `?site=site2`) thay vì server riêng cũ. web_hub không hỗ trợ sẵn các filter
// nâng cao (experience bucket, price bucket, quick badge, sort "popular"...)
// mà Home.vue/FilterBar.vue cần, nên lấy nguyên danh sách của site2 (rất nhỏ,
// tối đa vài chục bản ghi) rồi lọc/sắp xếp lại ở tầng này y hệt logic server
// cũ (server/routes/spas.routes.js) để giữ đúng hành vi UI.
import { http, adminDeprecated, resolveImageUrl } from './http'
import { locationGroups } from '../data/locations'

const SITE_CODE = 'site2'

const areaSlugByLabel = new Map()
for (const g of locationGroups) {
  for (const a of g.areas) areaSlugByLabel.set(a.label, a.slug)
}

function mapBadgeKeys(badges) {
  return (badges || []).map((b) => (typeof b === 'string' ? b : b.key))
}

// web_hub's `business_images` hiện có vài business (chỉ ở site2) bị lặp ảnh
// 2-3 lần — vết của lần chạy `db:seed-mock` lại (script đó chưa idempotent
// cho riêng bảng images, xem MERGE_PLAN.md Phase 2). Lọc trùng theo URL ở
// đây để gallery không hiện ảnh y hệt lặp lại; dữ liệu gốc trong DB có thể
// cần dọn ở Phase 5 nhưng không chặn Phase 4.
function dedupeByUrl(urls) {
  return [...new Set(urls)]
}

function resolveImageUrls(urls) {
  return (urls || []).map(resolveImageUrl)
}

function mapListItem(b) {
  return {
    id: b.slug,
    name: b.name,
    tagline: b.tagline,
    categories: (b.categories || []).map((c) => c.slug),
    badges: mapBadgeKeys(b.badges),
    area: areaSlugByLabel.get(b.neighborhood) || '',
    areaLabel: b.neighborhood,
    city: b.city,
    address: b.address,
    rating: b.rating,
    reviewCount: b.reviewCount,
    cover: resolveImageUrl((b.images && b.images[0]) || ''),
    images: dedupeByUrl(resolveImageUrls(b.images)),
    rates: (b.rates || []).map((r) => ({ duration: r.timeLabel, price: r.studioPrice })),
  }
}

function minPrice(item) {
  return item.rates.length ? Math.min(...item.rates.map((r) => r.price)) : 0
}

// `experience` (số năm) chỉ có trong business_info, vốn không nằm trong
// GET /api/businesses list — chỉ fetch chi tiết từng item khi thực sự cần
// lọc theo kinh nghiệm (bộ dữ liệu site2 rất nhỏ nên chấp nhận N request).
async function fetchExperienceYears(items) {
  const map = {}
  await Promise.all(
    items.map(async (it) => {
      try {
        const detail = await http.get(`/api/businesses/${encodeURIComponent(it.id)}`)
        const row = (detail.info || []).find((i) => i.label === 'Experience')
        const m = row && String(row.value).match(/\d+/)
        map[it.id] = m ? Number(m[0]) : 0
      } catch {
        map[it.id] = 0
      }
    })
  )
  return map
}

export async function fetchSpas(params = {}) {
  const query = new URLSearchParams({ site: SITE_CODE, pageSize: '100' })
  if (params.type) query.set('category', params.type)
  if (params.search) query.set('search', params.search)
  const res = await http.get(`/api/businesses?${query.toString()}`)
  let items = res.items.map(mapListItem)

  if (params.area) items = items.filter((i) => i.area === params.area)

  if (params.experience) {
    const expMap = await fetchExperienceYears(items)
    items = items.filter((i) => {
      const years = expMap[i.id] ?? 0
      if (params.experience === 'under3') return years < 3
      if (params.experience === '3to6') return years >= 3 && years <= 6
      if (params.experience === 'over6') return years > 6
      return true
    })
  }

  if (params.price === 'under300') items = items.filter((i) => minPrice(i) < 300000)
  if (params.price === '300to500') items = items.filter((i) => minPrice(i) >= 300000 && minPrice(i) <= 500000)
  if (params.price === 'over500') items = items.filter((i) => minPrice(i) > 500000)

  if (params.quick) {
    const keys = Array.isArray(params.quick) ? params.quick : String(params.quick).split(',').filter(Boolean)
    if (keys.length) items = items.filter((i) => keys.every((k) => i.badges.includes(k)))
  }

  const sort = params.sort || 'popular'
  if (sort === 'rating') items.sort((a, b) => b.rating - a.rating)
  else if (sort === 'priceAsc') items.sort((a, b) => minPrice(a) - minPrice(b))
  else if (sort === 'priceDesc') items.sort((a, b) => minPrice(b) - minPrice(a))
  else items.sort((a, b) => b.reviewCount - a.reviewCount)

  const total = items.length
  const page = Math.max(1, Number(params.page) || 1)
  const pageSize = Math.min(100, Math.max(1, Number(params.pageSize) || 50))
  const start = (page - 1) * pageSize

  return { items: items.slice(start, start + pageSize), total, page, pageSize }
}

export async function fetchSpa(id) {
  const b = await http.get(`/api/businesses/${encodeURIComponent(id)}`)
  const infoObj = {}
  for (const row of b.info || []) infoObj[row.label] = row.value

  return {
    id: b.slug,
    name: b.name,
    tagline: b.tagline,
    categories: (b.categories || []).map((c) => c.slug),
    badges: mapBadgeKeys(b.badges),
    area: areaSlugByLabel.get(b.neighborhood) || '',
    areaLabel: b.neighborhood,
    city: b.city,
    address: b.address,
    rating: b.rating,
    reviewCount: b.reviewCount,
    cover: resolveImageUrl((b.images && b.images[0]?.url) || ''),
    images: dedupeByUrl(resolveImageUrls((b.images || []).map((img) => img.url))), // Gallery.vue muốn mảng URL thuần
    imageList: (b.images || []).map((img) => ({ id: img.id, url: resolveImageUrl(img.url) })), // shape admin cũ cần id để xoá
    info: infoObj,
    bio: b.shortDescription,
    rates: (b.rates || []).map((r) => ({ duration: r.timeLabel, price: r.studioPrice })),
    services: (b.services || []).map((s) => ({ name: s.name, included: !!s.included, extraPrice: s.extraPrice })),
    reviews: (b.reviews || []).map((r) => ({ author: r.author, date: r.reviewDate, rating: r.rating, text: r.text })),
  }
}

// Admin cũ (src/admin/) sẽ bị gỡ ở Phase 5 — không rewire các thao tác ghi.
export const createSpa = adminDeprecated
export const updateSpa = adminDeprecated
export const deleteSpa = adminDeprecated
export const uploadSpaImage = adminDeprecated
export const deleteSpaImage = adminDeprecated
