<script setup>
defineProps({ services: { type: Array, required: true } })

function formatPrice(n) {
  return '+' + n.toLocaleString('en-US') + ' USD'
}
</script>

<template>
  <div class="service-list card">
    <h3>Included Services</h3>
    <ul>
      <li v-for="s in services" :key="s.name">
        <span class="check" :class="{ free: s.included }">{{ s.included ? '✓' : '+' }}</span>
        <span class="name">{{ s.name }}</span>
        <span class="extra" v-if="!s.included">{{ formatPrice(s.extraPrice) }}</span>
        <span class="extra free-label" v-else>Free</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.service-list { padding: 18px; }
.service-list h3 { font-size: 16px; margin-bottom: 12px; }
ul { display: flex; flex-direction: column; gap: 10px; }
li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}
.check {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  background: var(--bg-soft);
  color: var(--text-muted);
  flex-shrink: 0;
}
.check.free { background: var(--accent-soft); color: var(--accent-strong); }
.name { flex: 1; }
.extra { font-size: 12px; color: var(--gold); font-weight: 600; }
.free-label { color: var(--accent-strong); }
</style>
