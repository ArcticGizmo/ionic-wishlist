<template>
  <div class="item-card">
    <BImage v-if="item.src" :src="item.src" />
    <div v-else class="name">{{ item.name }}</div>
    <div class="rating">{{ item.rating || '--' }}</div>
  </div>
</template>

<script setup lang="ts">
import { WishlistItem } from '@/types';
import { PropType } from 'vue';
import BImage from './BImage.vue';

defineProps({
  item: { type: Object as PropType<WishlistItem>, required: true }
});
</script>

<style>
.item-card .b-image {
  object-fit: cover;
  margin: 0.1rem;
  height: 100%;
  width: auto;
}
</style>

<style scoped>
.item-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid rgb(204, 204, 204);
  min-height: 15rem;
}

.name {
  text-align: center;
  width: 100%;
}

.rating {
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;
}
</style>
