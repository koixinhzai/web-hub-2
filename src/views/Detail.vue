<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchSpa } from '../api/spas'
import Gallery from '../components/Gallery.vue'
import Badge from '../components/Badge.vue'
import PriceTable from '../components/PriceTable.vue'
import ServiceList from '../components/ServiceList.vue'

const route = useRoute()
const item = ref(null)
const loading = ref(true)

async function load() {
  loading.value = true
  item.value = null
  try {
    item.value = await fetchSpa(route.params.id)
  } catch {
    item.value = null
  } finally {
    loading.value = false
  }
}

watch(() => route.params.id, load)
onMounted(load)
</script>

<template>
  <div v-if="item" class="container detail-page">
    <router-link to="/" class="back-link">← Back to list</router-link>

    <div class="detail-grid">
      <div class="left-col">
        <Gallery :images="item.images" :alt="item.name">
          <template #overlay>
            <div class="badges-overlay">
              <Badge v-for="b in item.badges" :key="b" :type="b" />
            </div>
          </template>
        </Gallery>

        <div class="info-panel card">
          <h1>{{ item.name }}</h1>
          <p class="tagline">{{ item.tagline }}</p>
          <div class="rating-row">
            <span>⭐ {{ item.rating }}</span>
            <span class="muted">({{ item.reviewCount }} reviews)</span>
            <span class="muted">📍 {{ item.areaLabel }}, {{ item.city }}</span>
          </div>

          <dl class="info-grid">
            <div v-for="(value, key) in item.info" :key="key" class="info-row">
              <dt>{{ key }}</dt>
              <dd>{{ value }}</dd>
            </div>
          </dl>

          <h3 class="bio-heading">About</h3>
          <p class="bio">{{ item.bio }}</p>
        </div>

        <div class="reviews card">
          <h3>Customer Reviews</h3>
          <div v-for="r in item.reviews" :key="r.author + r.date" class="review">
            <div class="review-head">
              <strong>{{ r.author }}</strong>
              <span class="review-rating">{{ '⭐'.repeat(r.rating) }}</span>
              <span class="muted">{{ r.date }}</span>
            </div>
            <p>{{ r.text }}</p>
          </div>
        </div>
      </div>

      <div class="right-col">
        <PriceTable :rates="item.rates" />
        <ServiceList :services="item.services" />
      </div>
    </div>
  </div>

  <div v-else-if="!loading" class="container not-found">
    <p>This location was not found.</p>
    <router-link to="/" class="btn btn-primary">Back to homepage</router-link>
  </div>
</template>

<style scoped>
.detail-page { padding: 24px 20px 60px; }
.back-link {
  display: inline-block;
  margin-bottom: 16px;
  color: var(--text-muted);
  font-size: 14px;
}
.back-link:hover { color: var(--accent-strong); }

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 28px;
  align-items: start;
}
.left-col { display: flex; flex-direction: column; gap: 20px; }
.right-col { display: flex; flex-direction: column; gap: 20px; position: sticky; top: 90px; }

.badges-overlay {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.info-panel { padding: 20px; }
.info-panel h1 { font-size: 22px; margin-bottom: 4px; }
.tagline { color: var(--text-muted); margin-bottom: 10px; }
.rating-row {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  font-size: 14px;
  margin-bottom: 16px;
}
.muted { color: var(--text-muted); }

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 20px;
  padding: 14px;
  background: var(--bg-soft);
  border-radius: 10px;
  margin-bottom: 18px;
}
.info-row { display: flex; flex-direction: column; gap: 2px; }
.info-row dt { font-size: 12px; color: var(--text-muted); }
.info-row dd { font-size: 14px; font-weight: 500; }

.bio-heading { font-size: 16px; margin-bottom: 8px; }
.bio { font-size: 14px; line-height: 1.7; color: var(--text); }

.reviews { padding: 20px; }
.reviews h3 { font-size: 16px; margin-bottom: 14px; }
.review { padding: 12px 0; border-top: 1px solid var(--border); }
.review:first-of-type { border-top: none; }
.review-head { display: flex; gap: 10px; align-items: center; margin-bottom: 4px; font-size: 13px; }
.review p { font-size: 14px; line-height: 1.6; }

.not-found { padding: 60px 0; text-align: center; display: flex; flex-direction: column; gap: 14px; align-items: center; }

@media (max-width: 900px) {
  .detail-grid { grid-template-columns: 1fr; }
  .right-col { position: static; }
}
</style>
