<template>
  <BasePage hide-header>
    <PictureField v-model="src" class="picture-field" name="picture" />
    <TextField v-model="name" name="name" />
    <TextField v-model="brand" name="brand" />
    <TextField v-model="url" name="Website" />
    <NumberField v-model="price" name="price" />

    <NumberField v-model="rating" name="rating" />
    <div class="actions">
      <ion-button @click="onClose()">Cancel</ion-button>
      <ion-button v-if="canDelete" @click="onDelete()">Delete</ion-button>
      <ion-button :disabled="!canSubmit" @click="onSubmit()">{{ item ? 'Update' : 'Create' }}</ion-button>
    </div>
  </BasePage>
</template>

<script setup lang="ts">
import { PropType, ref, computed } from 'vue';
import { WishlistItem } from '@/types';
import BasePage from '@/views/BasePage.vue';
import { modalController, IonButton, alertController, AlertOptions } from '@ionic/vue';
import TextField from '@/components/TextField.vue';
import NumberField from '@/components/NumberField.vue';
import PictureField from '@/components/PictureField.vue';

const props = defineProps({
  item: { type: Object as PropType<WishlistItem> },
  canDelete: { type: Boolean }
});

const name = ref(props.item?.name || '');
const brand = ref(props.item?.brand);
const src = ref(props.item?.src);
const url = ref(props.item?.url);
const price = ref(props.item?.price || undefined);
const rating = ref(props.item?.rating || 0);

const canSubmit = computed(() => name.value);

const onClose = () => modalController.dismiss();

const onSubmit = () => {
  modalController.dismiss({
    name: name.value,
    brand: brand.value,
    url: url.value,
    src: src.value,
    price: price.value,
    rating: rating.value
  });
};
const onDelete = async () => {
  const opts: AlertOptions = {
    header: `Delete '${props.item?.name}'?`,
    buttons: [
      {
        id: 'yes',
        text: 'yes',
        role: 'destructive'
      },
      {
        id: 'no',
        text: 'no',
        role: 'cancel'
      }
    ]
  };
  const alert = await alertController.create(opts);
  await alert.present();
  const resp = await alert.onDidDismiss();

  if (resp.role === 'destructive') {
    modalController.dismiss(undefined, 'destructive');
  }
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
