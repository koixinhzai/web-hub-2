<script setup>
import Badge from './Badge.vue'

const props = defineProps({ item: { type: Object, required: true } })

function minPrice(item) {
  return Math.min(...item.rates.map((r) => r.price))
}
function formatPrice(n) {
  return n.toLocaleString('en-US') + ' USD'
}
</script>

<template>
  <router-link :to="{ name: 'detail', params: { id: item.id } }" class="spa-card">
    <div class="thumb">
      <img :src="item.cover" :alt="item.name" loading="lazy" />
      <div class="badges">
        <Badge v-for="b in item.badges" :key="b" :type="b" />
      </div>
    </div>
    <div class="body">
      <h3>{{ item.name }}</h3>
      <p class="tagline">{{ item.tagline }}</p>
      <p class="location">📍 {{ item.areaLabel }}, {{ item.city }}</p>
      <div class="meta">
        <span class="rating">⭐ {{ item.rating }} <em>({{ item.reviewCount }})</em></span>
        <span class="price">From {{ formatPrice(minPrice(item)) }}</span>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.spa-card {
  display: block;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: transform .15s ease, box-shadow .15s ease;
}
.spa-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(60, 50, 30, 0.12);
}
.thumb {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}
.thumb img { width: 100%; height: 100%; object-fit: cover; }
.badges {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.body { padding: 14px 16px 16px; }
.body h3 { font-size: 16px; margin-bottom: 4px; }
.tagline {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 6px;
}
.location {
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 10px;
}
.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}
.rating em { font-style: normal; color: var(--text-muted); }
.price { font-weight: 600; color: var(--accent-strong); }
</style>
