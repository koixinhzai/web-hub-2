<script setup>
import { computed } from 'vue'
import { useBadgeMeta } from '../store/lookups'

const props = defineProps({
  items: { type: Array, required: true }, // items already filtered by category+area, used for badge counts
  modelValue: { type: Object, required: true }
})
const emit = defineEmits(['update:modelValue'])
const badgeMeta = useBadgeMeta()

function update(patch) {
  emit('update:modelValue', { ...props.modelValue, ...patch })
}

function toggleQuick(key) {
  const set = new Set(props.modelValue.quick)
  if (set.has(key)) set.delete(key)
  else set.add(key)
  update({ quick: [...set] })
}

const quickCounts = computed(() => {
  const counts = {}
  for (const key of Object.keys(badgeMeta.value)) {
    counts[key] = props.items.filter((i) => i.badges.includes(key)).length
  }
  return counts
})
</script>

<template>
  <div class="filter-bar">
    <div class="dropdowns">
      <select :value="modelValue.price" @change="update({ price: $event.target.value })">
        <option value="">Price: All</option>
        <option value="under300">Under 300 USD</option>
        <option value="300to500">300 USD – 500 USD</option>
        <option value="over500">Over 500 USD</option>
      </select>

      <select :value="modelValue.experience" @change="update({ experience: $event.target.value })">
        <option value="">Experience: All</option>
        <option value="under3">Under 3 years</option>
        <option value="3to6">3 – 6 years</option>
        <option value="over6">Over 6 years</option>
      </select>

      <select :value="modelValue.sort" @change="update({ sort: $event.target.value })">
        <option value="popular">Sort: Most popular</option>
        <option value="rating">Highest rated</option>
        <option value="priceAsc">Price: low to high</option>
        <option value="priceDesc">Price: high to low</option>
      </select>
    </div>

    <div class="quick-filters">
      <label v-for="key in Object.keys(badgeMeta)" :key="key" class="quick-chip" :class="{ active: modelValue.quick.includes(key) }">
        <input type="checkbox" :checked="modelValue.quick.includes(key)" @change="toggleQuick(key)" />
        {{ badgeMeta[key].label }}
        <span class="chip-count">{{ quickCounts[key] }}</span>
      </label>
    </div>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 14px 16px;
  margin-bottom: 20px;
}
.dropdowns {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.dropdowns select {
  border: 1px solid var(--border);
  background: var(--bg);
  border-radius: 8px;
  padding: 7px 10px;
  font-size: 13px;
  cursor: pointer;
}
.quick-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.quick-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 5px 12px;
  font-size: 13px;
  cursor: pointer;
  color: var(--text-muted);
}
.quick-chip input { accent-color: var(--accent); }
.quick-chip.active {
  border-color: var(--accent);
  color: var(--accent-strong);
  background: var(--accent-soft);
}
.chip-count {
  background: var(--bg-soft);
  border-radius: 999px;
  padding: 0 7px;
  font-size: 11px;
}
.quick-chip.active .chip-count { background: var(--accent); color: #fff; }
</style>
