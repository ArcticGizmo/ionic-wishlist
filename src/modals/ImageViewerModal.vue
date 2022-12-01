<template>
  <div class="image-viewer-modal">
    <img ref="image" :src="src" />
    <ion-button @click="onClose">Back</ion-button>
  </div>
</template>

<script setup lang="ts">
import { IonButton, modalController } from '@ionic/vue';
import { onMounted, ref } from 'vue';
import PinchZoom from 'pinch-zoom-js';

const image = ref();

defineProps({
  src: String
});

onMounted(() => {
  new PinchZoom(image.value);
});

const onClose = () => modalController.dismiss();
</script>

<style scoped>
.image-viewer-modal {
  height: 100%;
}

ion-button {
  position: absolute;
  height: 3rem;
  bottom: 1rem;
  padding: 0 0.5rem;
  width: 100%;
}
</style>
