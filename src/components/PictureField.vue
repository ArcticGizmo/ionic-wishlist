<template>
  <div class="picture-field" :name="name" :label="label">
    <div class="wrapper">
      <div class="image-area">
        <BImage :src="modelValue" @click="onViewImage" />
        <ion-icon v-if="modelValue" :icon="closeCircleOutline" @click="onClearImage" />
      </div>
      <div class="buttons">
        <ion-button v-if="showGallery" @click="onOpenGallery">
          <ion-icon :icon="imageOutline" @click="onOpenGallery" />
          <ion-label> Gallery </ion-label>
        </ion-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonIcon, IonLabel, IonButton, modalController } from '@ionic/vue';
import { Camera } from '@capacitor/camera';
import BImage from './BImage.vue';

import { imageOutline, closeCircleOutline } from 'ionicons/icons';

import { webPathToDataUrl } from '@/code/image';
import ImageViewerModal from '@/modals/ImageViewerModal.vue';
import { computed } from 'vue';

const props = defineProps({
  modelValue: { type: String },
  name: { type: String, required: true },
  label: String,
  mode: { type: String, default: null }
});

const emits = defineEmits(['update:modelValue']);

const showGallery = computed(() => !props.mode || props.mode === 'gallery');

const updateImage = (value: string | undefined) => {
  emits('update:modelValue', value);
};

const onViewImage = async () => {
  if (!props.modelValue) {
    return;
  }
  const modal = await modalController.create({
    component: ImageViewerModal,
    componentProps: { src: props.modelValue }
  });

  await modal.present();
};

const onOpenGallery = async () => {
  const resp = await Camera.pickImages({
    quality: 90,
    limit: 1,
    height: 100,
    width: 100
  });
  const photo = resp.photos[0];
  if (!photo) {
    return;
  }
  const dataUrl = await webPathToDataUrl(photo.webPath);
  updateImage(dataUrl);
};

const onClearImage = (e: Event) => {
  e.preventDefault();
  updateImage(undefined);
};
</script>

<style>
.picture-field .field-input.error .image-area {
  border-color: #dc3545;
  background-color: rgba(255, 199, 205, 0.871);
}
</style>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.image-area {
  position: relative;
  width: 100%;
  height: 30rem;
  border: 1px solid gray;
  background-color: rgb(238, 238, 238);
}

.image-area .b-image {
  width: 100%;
  height: 100%;
  padding: 0.5rem;
}

.image-area ion-icon {
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  color: gray;
  top: 0;
  right: 0;
  z-index: 20;
}

.buttons {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.buttons ion-icon {
  height: 100%;
  width: 2rem;
}

.buttons ion-button {
  width: 100%;
}

.buttons ion-label {
  margin-left: 0.5rem;
  font-size: 0.75rem;
}
</style>
