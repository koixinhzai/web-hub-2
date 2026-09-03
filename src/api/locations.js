// Rewired ở Phase 4: schema hợp nhất của web_hub KHÔNG có bảng cities/areas
// riêng (đã chốt ở Phase 2 MERGE_PLAN.md) — chỉ có `city`/`neighborhood` dạng
// text tự do trên từng business. Giữ nguyên cấu trúc nhóm khu vực tĩnh trong
// src/data/locations.js (slug/label do Sidebar.vue cần để lọc theo `?area=`),
// nhưng tính lại `count` real-time bằng cách đếm business của site2 theo
// field `neighborhood` (khớp label của area).
import { http, adminDeprecated } from './http'
import { locationGroups as staticGroups } from '../data/locations'

const SITE_CODE = 'site2'

export async function fetchLocationGroups() {
  const res = await http.get(`/api/businesses?site=${SITE_CODE}&pageSize=100`)
  const counts = new Map()
  for (const b of res.items) {
    if (!b.neighborhood) continue
    counts.set(b.neighborhood, (counts.get(b.neighborhood) || 0) + 1)
  }
  return staticGroups.map((g) => ({
    group: g.group,
    areas: g.areas.map((a) => ({ slug: a.slug, label: a.label, count: counts.get(a.label) || 0 })),
  }))
}

// Không còn bảng cities/areas để CRUD (xem ghi chú trên) — admin cũ
// (src/admin/) sẽ bị gỡ ở Phase 5 nên không xây lại tính năng này.
export const fetchAreas = adminDeprecated
export const fetchCities = adminDeprecated
export const createCity = adminDeprecated
export const updateCity = adminDeprecated
export const deleteCity = adminDeprecated
export const createArea = adminDeprecated
export const updateArea = adminDeprecated
export const deleteArea = adminDeprecated
