<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCategories } from '../store/lookups'

defineProps({ theme: String })
defineEmits(['toggle-theme'])

const route = useRoute()
const activeType = computed(() => route.query.type || '')
const categories = useCategories()
</script>

<template>
  <div class="topbar">
    <div class="container topbar-inner">
      <div class="topbar-left">
        <span>📞 1900 6868</span>
        <span>✉️ hello@serenespa.vn</span>
      </div>
      <div class="topbar-right">
        <button class="link-btn">Log in</button>
        <button class="link-btn">Sign up</button>
        <select class="lang-select" aria-label="Language">
          <option>VI</option>
          <option>EN</option>
        </select>
        <button class="theme-toggle" @click="$emit('toggle-theme')" :aria-label="theme === 'light' ? 'Switch to dark' : 'Switch to light'">
          {{ theme === 'light' ? '🌙' : '☀️' }}
        </button>
      </div>
    </div>
  </div>

  <header class="main-header">
    <div class="container main-header-inner">
      <router-link to="/" class="brand">
        <span class="brand-icon">🌿</span>
        <span class="brand-name">Serene<strong>Spa</strong></span>
      </router-link>

      <nav class="main-nav">
        <router-link
          v-for="c in categories"
          :key="c.slug"
          :to="{ path: '/', query: { type: c.slug } }"
          class="nav-item"
          :class="{ active: activeType === c.slug }"
        >
          <span class="nav-icon">{{ c.icon }}</span>
          {{ c.label }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  background: var(--accent-strong);
  color: #fff;
  font-size: 13px;
}
.topbar-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 20px;
  flex-wrap: wrap;
  gap: 8px;
}
.topbar-left { display: flex; gap: 16px; opacity: .95; }
.topbar-right { display: flex; align-items: center; gap: 10px; }
.link-btn {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  opacity: .9;
  font-size: 13px;
}
.link-btn:hover { opacity: 1; text-decoration: underline; }
.lang-select {
  background: rgba(255,255,255,.15);
  border: 1px solid rgba(255,255,255,.3);
  color: #fff;
  border-radius: 6px;
  padding: 2px 6px;
}
.theme-toggle {
  background: rgba(255,255,255,.15);
  border: 1px solid rgba(255,255,255,.3);
  border-radius: 999px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-header {
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 20;
}
.main-header-inner {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 14px 20px;
  flex-wrap: wrap;
}
.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
}
.brand-icon { font-size: 24px; }
.brand-name strong { color: var(--accent-strong); }

.main-nav {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted);
  transition: all .15s ease;
}
.nav-item:hover { background: var(--bg-soft); color: var(--text); }
.nav-item.active {
  background: var(--accent-soft);
  color: var(--accent-strong);
}
.nav-icon { font-size: 15px; }

@media (max-width: 720px) {
  .main-header-inner { gap: 12px; }
  .main-nav { gap: 2px; }
  .nav-item { padding: 6px 10px; font-size: 13px; }
}
</style>
