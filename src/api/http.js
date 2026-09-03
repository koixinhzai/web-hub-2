// Thin fetch wrapper: attaches the admin JWT (if present) and normalizes error handling.
// Base is relative ('') by default so requests go through the Vite dev proxy in dev.
// Production (Phase 5): this site deploys static, tách domain khỏi web_hub's server —
// set VITE_API_BASE_URL (vd "https://api.yourdomain.com", KHÔNG có "/api" ở cuối) lúc
// build để trỏ tuyệt đối sang API thật, xem DEPLOY.md. Để trống thì giữ hành vi cũ.
const API_ORIGIN = import.meta.env.VITE_API_BASE_URL || ''

// business_images.url trả về từ web_hub là đường dẫn tương đối "/uploads/..."
// khi ảnh do admin upload, nhưng là URL tuyệt đối "https://..." khi là ảnh
// stock/demo từ mock data gốc. Quy về tuyệt đối theo origin của API để hiển
// thị đúng khi site và API nằm khác domain.
export function resolveImageUrl(url) {
  if (!url) return url
  if (/^https?:\/\//i.test(url)) return url
  return `${API_ORIGIN}${url}`
}

async function request(path, options = {}) {
  const token = localStorage.getItem('admin_token')
  const headers = { ...(options.headers || {}) }
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${API_ORIGIN}${path}`, { ...options, headers })
  if (res.status === 204) return null

  let data = null
  try {
    data = await res.json()
  } catch {
    // no JSON body (e.g. some error pages) — fall through with data = null
  }

  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`)
  }
  return data
}

export const http = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body: body instanceof FormData ? body : JSON.stringify(body) }),
  put: (path, body) => request(path, { method: 'PUT', body: body instanceof FormData ? body : JSON.stringify(body) }),
  del: (path) => request(path, { method: 'DELETE' })
}

// Phase 4 (rewire sang web_hub API): trang admin cũ (src/admin/) sẽ bị gỡ ở
// Phase 5 khi admin mới (web_hub/admin) đã thay thế hoàn toàn, nên các hàm
// ghi dữ liệu (create/update/delete/upload) không được rewire sang API mới —
// chỉ trả lỗi rõ ràng nếu lỡ còn ai mở admin cũ, thay vì crash im lặng.
export function adminDeprecated() {
  throw new Error('Chức năng quản trị này đã chuyển sang trang admin mới (web_hub/admin), không còn hoạt động ở đây.')
}
