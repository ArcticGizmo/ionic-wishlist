<template>
  <BasePage hide-header>
    <TextField v-model="name" name="name" />
    <TextField v-model="brand" name="brand" />
    <!-- replace with image uploader -->
    <!-- <TextField v-model="price" name="price" /> -->
    <div class="actions">
      <ion-button @click="onClose()">Cancel</ion-button>
      <ion-button :disabled="!canSubmit" @click="onSubmit()">Submit</ion-button>
    </div>
  </BasePage>
</template>

<script setup lang="ts">
import { PropType, ref, computed } from 'vue';
import { WishlistItem } from '@/types';
import BasePage from '@/views/BasePage.vue';
import { modalController, IonButton } from '@ionic/vue';
import TextField from '@/components/TextField.vue';

const props = defineProps({
  item: { type: Object as PropType<WishlistItem> }
});

const name = ref(props.item?.name || '');
const brand = ref(props.item?.brand || '');
const src = ref(props.item?.src);
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
</script>
