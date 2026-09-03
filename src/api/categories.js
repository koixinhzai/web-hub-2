// Rewired ở Phase 4: `/api/categories` của web_hub là danh mục dùng chung
// cho cả 3 site, nên lọc lại chỉ giữ category thực sự có ít nhất 1 business
// thuộc site2 — tránh nav hiện nhầm category của site 1/3.
import { http, adminDeprecated } from './http'

const SITE_CODE = 'site2'

export async function fetchCategories() {
  const [all, res] = await Promise.all([
    http.get('/api/categories'),
    http.get(`/api/businesses?site=${SITE_CODE}&pageSize=100`),
  ])
  const usedSlugs = new Set()
  for (const b of res.items) {
    for (const c of b.categories || []) usedSlugs.add(c.slug)
  }
  return all
    .filter((c) => usedSlugs.has(c.slug))
    .map((c) => ({ id: c.id, slug: c.slug, label: c.label, title: c.title, icon: c.icon, sortOrder: c.sortOrder }))
}

// Admin cũ (src/admin/) sẽ bị gỡ ở Phase 5 — không rewire các thao tác ghi.
export const createCategory = adminDeprecated
export const updateCategory = adminDeprecated
export const deleteCategory = adminDeprecated
