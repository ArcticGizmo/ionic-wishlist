<template>
  <div class="item-card">
    <img v-if="item.src" :src="item.src" />
    <div v-else class="name">{{ item.name }}</div>
  </div>
</template>

<script setup lang="ts">
import { WishlistItem } from '@/types';
import { PropType } from 'vue';

defineProps({
  item: { type: Object as PropType<WishlistItem>, required: true }
});
</script>

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

img {
  object-fit: cover;
  margin: 0.1rem;
}
</style>
