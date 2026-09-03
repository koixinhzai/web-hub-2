// Rewired ở Phase 4: `/api/badges` của web_hub là bảng badge dùng chung cho
// cả 3 site (site1 + site2 gộp chung, xem MERGE_PLAN.md mục "Quyết định đã
// chốt"), nên lọc lại chỉ giữ badge thực sự được gắn cho ít nhất 1 business
// của site2 — FilterBar's "quick filters" mới đúng là badge của site2.
import { http, adminDeprecated } from './http'

const SITE_CODE = 'site2'

export async function fetchBadges() {
  const [all, res] = await Promise.all([
    http.get('/api/badges'),
    http.get(`/api/businesses?site=${SITE_CODE}&pageSize=100`),
  ])
  const usedKeys = new Set()
  for (const b of res.items) {
    for (const badge of b.badges || []) usedKeys.add(badge.key)
  }
  return all.filter((b) => usedKeys.has(b.key)).map((b) => ({ id: b.id, key: b.key, label: b.label, color: b.color }))
}

// Admin cũ (src/admin/) sẽ bị gỡ ở Phase 5 — không rewire các thao tác ghi.
export const createBadge = adminDeprecated
export const updateBadge = adminDeprecated
export const deleteBadge = adminDeprecated

// Converts the [{key,label,color}] API shape into the {key: {label,color}} map
// shape the original mock's `badgeMeta` object used, so components barely change.
export function toBadgeMeta(list) {
  const map = {}
  for (const b of list) map[b.key] = { label: b.label, color: b.color }
  return map
}
