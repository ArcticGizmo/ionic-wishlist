<template>
  <BasePage hide-header>
    <ion-fab-button class="add-item">
      <ion-icon :icon="add" @click="onAdd()" />
    </ion-fab-button>
    <div class="items">
      <ItemCard v-for="(item, index) in items" :key="index" :item="item" @click="onEdit(item, index)" />
    </div>
  </BasePage>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ItemCard from '@/components/ItemCard.vue';
import BasePage from './BasePage.vue';
import { WishlistItem } from '@/types';
import { IonFabButton, IonIcon, modalController } from '@ionic/vue';
import { add } from 'ionicons/icons';
import WishlistModal from '@/modals/WishlistModal.vue';
import { Preferences } from '@capacitor/preferences';

const KEY = 'MY_ITEMS';

const items = ref<WishlistItem[]>([]);

onMounted(() => {
  loadItems();
});

const saveItems = async () => {
  await Preferences.set({ key: KEY, value: JSON.stringify(items.value) });
};

const loadItems = async () => {
  const data = await Preferences.get({ key: KEY });
  if (data.value) {
    items.value = JSON.parse(data.value);
  }
};

const onAdd = async () => {
  const modal = await modalController.create({ component: WishlistModal });
  await modal.present();
  const resp = await modal.onDidDismiss<WishlistItem>();
  if (resp?.data) {
    items.value.push(resp.data);
    saveItems();
  }
};

const onEdit = async (item: WishlistItem, index: number) => {
  const modal = await modalController.create({ component: WishlistModal, componentProps: { item, canDelete: true } });
  await modal.present();
  const resp = await modal.onDidDismiss<WishlistItem>();

  if (resp.role === 'destruction') {
    items.value.splice(index, 1);
    saveItems();
    return;
  }

  if (resp?.data) {
    items.value[index] = resp.data;
    saveItems();
  }
};
</script>

<style scoped>
.items {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-gap: 0.25rem;
  justify-content: space-around;
}

.add-item {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 1000;
}
</style>
