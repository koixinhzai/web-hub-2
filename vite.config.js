import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5174,
    proxy: {
      // Phase 4: server riêng cũ không còn được dùng — frontend giờ gọi API
      // hợp nhất của web_hub (D:\web_hub\server, mặc định port 4000).
      '/api': 'http://localhost:4000',
      '/uploads': 'http://localhost:4000'
    }
  }
})
