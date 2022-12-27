<template>
  <div class="collection-card" :style="`background-color: ${color}`">
    <div class="text">{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: { type: undefined },
  color: { type: String, default: 'orange' }
});
</script>

<style scoped>
.collection-card {
  height: 10rem;
  margin: 0.5rem;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.collection-card .text {
  text-align: center;
}
</style>
