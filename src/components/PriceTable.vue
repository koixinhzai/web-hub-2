<script setup>
defineProps({ rates: { type: Array, required: true } })

function formatPrice(n) {
  return n.toLocaleString('en-US') + ' USD'
}
</script>

<template>
  <div class="price-table card">
    <h3>Service Pricing</h3>
    <ul>
      <li v-for="r in rates" :key="r.duration">
        <span>{{ r.duration }}</span>
        <strong>{{ formatPrice(r.price) }}</strong>
      </li>
    </ul>
    <button class="btn btn-primary book-btn">Book Now</button>
  </div>
</template>

<style scoped>
.price-table { padding: 18px; }
.price-table h3 { font-size: 16px; margin-bottom: 12px; }
ul { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  background: var(--bg-soft);
  border-radius: 8px;
  font-size: 14px;
}
li strong { color: var(--accent-strong); }
.book-btn { width: 100%; justify-content: center; }
</style>
