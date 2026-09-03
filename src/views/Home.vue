<script setup>
import { computed, reactive, ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchSpas } from '../api/spas'
import { useCategories } from '../store/lookups'
import Sidebar from '../components/Sidebar.vue'
import FilterBar from '../components/FilterBar.vue'
import SpaCard from '../components/SpaCard.vue'

const route = useRoute()
const categories = useCategories()

const filters = reactive({ price: '', experience: '', sort: 'popular', quick: [] })

const activeCategory = computed(() => categories.value.find((c) => c.slug === route.query.type))
const activeArea = computed(() => route.query.area || '')

// filtered by category + area only (used for FilterBar badge counts)
const scopedItems = ref([])
// fully filtered list (price/experience/sort/quick applied server-side)
const displayItems = ref([])
const loading = ref(false)

async function loadScoped() {
  const data = await fetchSpas({ type: route.query.type, area: activeArea.value, pageSize: 100 })
  scopedItems.value = data.items
}

async function loadDisplay() {
  loading.value = true
  try {
    const data = await fetchSpas({
      type: route.query.type,
      area: activeArea.value,
      price: filters.price,
      experience: filters.experience,
      sort: filters.sort,
      quick: filters.quick,
      pageSize: 100
    })
    displayItems.value = data.items
  } finally {
    loading.value = false
  }
}

function reload() {
  loadScoped()
  loadDisplay()
}

watch(() => [route.query.type, route.query.area], reload)
watch(filters, loadDisplay, { deep: true })
onMounted(reload)

const heading = computed(() => activeCategory.value ? activeCategory.value.title : 'All spas & therapy centers')
</script>

<template>
  <div class="container page">
    <Sidebar />

    <main class="content">
      <h1>{{ heading }}</h1>
      <p class="sub">We found {{ displayItems.length }} locations matching your selection.</p>

      <FilterBar :items="scopedItems" v-model="filters" />

      <div v-if="displayItems.length" class="grid">
        <SpaCard v-for="item in displayItems" :key="item.id" :item="item" />
      </div>
      <p v-else-if="!loading" class="empty">No matching results found. Try removing some filters.</p>
    </main>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  gap: 28px;
  padding-top: 28px;
  align-items: flex-start;
}
.content { flex: 1; min-width: 0; }
h1 { font-size: 26px; margin-bottom: 6px; }
.sub { color: var(--text-muted); font-size: 14px; margin-bottom: 18px; }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  padding-bottom: 40px;
}
.empty { color: var(--text-muted); padding: 40px 0; }

@media (max-width: 900px) {
  .page { flex-direction: column; }
}
</style>
