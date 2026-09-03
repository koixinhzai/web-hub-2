<script setup>
import { useBadgeMeta } from '../store/lookups'

defineProps({ type: { type: String, required: true } })
const badgeMeta = useBadgeMeta()
</script>

<template>
  <span class="badge" :class="`badge-${badgeMeta[type]?.color || 'accent'}`">
    {{ badgeMeta[type]?.label || type }}
  </span>
</template>

<style scoped>
.badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 999px;
  color: #fff;
  letter-spacing: .02em;
}
.badge-accent { background: var(--accent); }
.badge-gold { background: var(--gold); }
.badge-danger { background: var(--danger); }
</style>
