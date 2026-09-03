<script setup>
import { onMounted, ref } from 'vue'
import Header from './components/Header.vue'

const theme = ref('light')

onMounted(() => {
  const saved = localStorage.getItem('spa-theme')
  theme.value = saved || 'light'
  document.documentElement.setAttribute('data-theme', theme.value)
})

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme.value)
  localStorage.setItem('spa-theme', theme.value)
}
</script>

<template>
  <Header :theme="theme" @toggle-theme="toggleTheme" />
  <router-view />
  <footer class="site-footer">
    <div class="container">
      <p>© 2026 Serene Spa Directory — Demo showcase page; data and images are for illustrative purposes only.</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--border);
  padding: 24px 0 40px;
  margin-top: 40px;
  color: var(--text-muted);
  font-size: 13px;
}
</style>
