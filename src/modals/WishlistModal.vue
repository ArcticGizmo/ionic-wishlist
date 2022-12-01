<template>
  <BasePage hide-header>
    <PictureField v-model="src" class="picture-field" name="picture" />
    <TextField v-model="name" name="name" />
    <TextField v-model="brand" name="brand" />
    <TextField v-model="url" name="url" />
    <div class="actions">
      <ion-button @click="onClose()">Cancel</ion-button>
      <ion-button :disabled="!canSubmit" @click="onSubmit()">{{ item ? 'Update' : 'Create' }}</ion-button>
      <ion-button v-if="canDelete" @click="onDelete()">Delete</ion-button>
    </div>
  </BasePage>
</template>

<script setup lang="ts">
import { PropType, ref, computed } from 'vue';
import { WishlistItem } from '@/types';
import BasePage from '@/views/BasePage.vue';
import { modalController, IonButton } from '@ionic/vue';
import TextField from '@/components/TextField.vue';
import PictureField from '@/components/PictureField.vue';

const props = defineProps({
  item: { type: Object as PropType<WishlistItem> },
  canDelete: { type: Boolean }
});

const name = ref(props.item?.name || '');
const brand = ref(props.item?.brand);
const src = ref(props.item?.src);
const url = ref(props.item?.url);

const price = ref(props.item?.price);

const canSubmit = computed(() => name.value);

const onClose = () => modalController.dismiss();

const onSubmit = () => {
  modalController.dismiss({
    name: name.value,
    brand: brand.value,
    src: src.value,
    price: price.value
  });
};
const onDelete = () => {
  modalController.dismiss(undefined, 'destruction');
};
</script>

<style scoped>
.actions {
  display: flex;
  padding-bottom: 5rem;
}

.actions > * {
  width: 100%;
  height: 3rem;
}
</style>
