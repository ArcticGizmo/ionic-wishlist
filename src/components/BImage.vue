<template>
  <div class="b-image">
    <img v-if="src && isValid" :src="src" />
    <ion-icon v-else :icon="imageOutline" />
    <img style="display: none" :src="src" @load="onLoad" @error="onError" />
  </div>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { ref } from 'vue';

import { imageOutline } from 'ionicons/icons';

defineProps({
  src: String
});

const isValid = ref(false);

const onLoad = () => (isValid.value = true);

const onError = () => (isValid.value = false);
</script>

<style scoped>
.b-image {
  height: 5rem;
  width: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}

ion-icon {
  height: 4rem;
  width: 4rem;
  color: gray;
}
</style>
