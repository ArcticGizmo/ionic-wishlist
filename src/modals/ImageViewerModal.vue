<template>
  <div class="image-viewer-modal">
    <img :src="src" />
    <ion-button @click="onClose">Back</ion-button>
  </div>
</template>

<script setup lang="ts">
import { IonButton, modalController } from '@ionic/vue';

defineProps({
  src: String
});

const onClose = () => modalController.dismiss();
</script>

<style scoped>
.image-viewer-modal {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

ion-button {
  position: absolute;
  bottom: 1rem;
  width: 80%;
}
</style>
