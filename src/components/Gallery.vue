<script setup>
import { ref } from 'vue'

const props = defineProps({ images: { type: Array, required: true }, alt: { type: String, default: '' } })

const activeIndex = ref(0)
const lightboxOpen = ref(false)

function select(i) {
  activeIndex.value = i
}
function openLightbox(i) {
  activeIndex.value = i
  lightboxOpen.value = true
}
function closeLightbox() {
  lightboxOpen.value = false
}
function next() {
  activeIndex.value = (activeIndex.value + 1) % props.images.length
}
function prev() {
  activeIndex.value = (activeIndex.value - 1 + props.images.length) % props.images.length
}
</script>

<template>
  <div class="gallery">
    <div class="main-image" @click="openLightbox(activeIndex)">
      <img :src="images[activeIndex]" :alt="alt" />
      <span class="zoom-hint">🔍 View full image</span>
      <slot name="overlay" />
    </div>
    <div class="thumbs">
      <button
        v-for="(img, i) in images"
        :key="i"
        class="thumb"
        :class="{ active: i === activeIndex }"
        @click="select(i)"
      >
        <img :src="img" :alt="`${alt} ${i + 1}`" />
      </button>
    </div>
  </div>

  <Teleport to="body">
    <div v-if="lightboxOpen" class="lightbox" @click.self="closeLightbox">
      <button class="lb-close" @click="closeLightbox">✕</button>
      <button class="lb-nav lb-prev" @click="prev">‹</button>
      <img :src="images[activeIndex]" :alt="alt" class="lb-image" />
      <button class="lb-nav lb-next" @click="next">›</button>
    </div>
  </Teleport>
</template>

<style scoped>
.gallery { width: 100%; }
.main-image {
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius);
  overflow: hidden;
  cursor: zoom-in;
  border: 1px solid var(--border);
}
.main-image img { width: 100%; height: 100%; object-fit: cover; }
.zoom-hint {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0,0,0,.55);
  color: #fff;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
}
.thumbs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 8px;
}
.thumb {
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  padding: 0;
  cursor: pointer;
  aspect-ratio: 1;
  background: none;
}
.thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.thumb.active { border-color: var(--accent); }

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.lb-image {
  max-width: 90vw;
  max-height: 85vh;
  border-radius: 8px;
  object-fit: contain;
}
.lb-close, .lb-nav {
  position: absolute;
  background: rgba(255,255,255,.12);
  border: none;
  color: #fff;
  cursor: pointer;
  border-radius: 999px;
  width: 42px;
  height: 42px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lb-close { top: 20px; right: 20px; }
.lb-prev { left: 20px; top: 50%; transform: translateY(-50%); }
.lb-next { right: 20px; top: 50%; transform: translateY(-50%); }
.lb-close:hover, .lb-nav:hover { background: rgba(255,255,255,.25); }

@media (max-width: 600px) {
  .thumbs { grid-template-columns: repeat(4, 1fr); }
}
</style>
