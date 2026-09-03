<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLocationGroups } from '../store/lookups'

const route = useRoute()
const router = useRouter()
const search = ref('')
const locationGroups = useLocationGroups()

const activeArea = computed(() => route.query.area || '')

const filteredGroups = computed(() => {
  if (!search.value.trim()) return locationGroups.value
  const q = search.value.trim().toLowerCase()
  return locationGroups.value
    .map((g) => ({
      ...g,
      areas: g.areas.filter((a) => a.label.toLowerCase().includes(q) || g.group.toLowerCase().includes(q))
    }))
    .filter((g) => g.areas.length)
})

function selectArea(slug) {
  const query = { ...route.query }
  if (query.area === slug) {
    delete query.area
  } else {
    query.area = slug
  }
  router.push({ path: '/', query })
}
</script>

<template>
  <aside class="sidebar">
    <div class="search-box">
      <span class="search-icon">🔍</span>
      <input v-model="search" type="text" placeholder="Search area..." />
    </div>

    <div class="area-groups">
      <div v-for="g in filteredGroups" :key="g.group" class="area-group">
        <h4>{{ g.group }}</h4>
        <ul>
          <li v-for="a in g.areas" :key="a.slug">
            <button
              class="area-item"
              :class="{ active: activeArea === a.slug }"
              @click="selectArea(a.slug)"
            >
              <span>{{ a.label }}</span>
              <span class="count">{{ a.count }}</span>
            </button>
          </li>
        </ul>
      </div>
      <p v-if="!filteredGroups.length" class="empty">No matching area found.</p>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 260px;
  flex-shrink: 0;
}
.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 8px 12px;
  margin-bottom: 16px;
}
.search-box input {
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  font-size: 14px;
}
.search-icon { opacity: .6; }

.area-group { margin-bottom: 18px; }
.area-group h4 {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: .04em;
  color: var(--text-muted);
  margin-bottom: 8px;
}
.area-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  border-radius: 8px;
  padding: 7px 10px;
  cursor: pointer;
  font-size: 14px;
  color: var(--text);
}
.area-item:hover { background: var(--bg-soft); }
.area-item.active {
  background: var(--accent-soft);
  color: var(--accent-strong);
  font-weight: 600;
}
.count {
  font-size: 12px;
  color: var(--text-muted);
  background: var(--bg-soft);
  border-radius: 999px;
  padding: 1px 8px;
}
.area-item.active .count {
  background: var(--accent);
  color: #fff;
}
.empty { font-size: 13px; color: var(--text-muted); }

@media (max-width: 900px) {
  .sidebar { width: 100%; }
}
</style>
