<template>
  <BasePage hide-header>
    <ion-fab-button class="filter">
      <ion-icon :icon="funnel" @click="onFilter()" />
    </ion-fab-button>
    <ion-fab-button class="add-item">
      <ion-icon :icon="add" @click="onAdd()" />
    </ion-fab-button>
    <div class="items">
      <ItemCard v-for="(item, index) in sortedItems" :key="index" :item="item" @click="onEdit(item, index)" />
    </div>
  </BasePage>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import ItemCard from '@/components/ItemCard.vue';
import BasePage from './BasePage.vue';
import { WishlistItem } from '@/types';
import { IonFabButton, IonIcon, modalController } from '@ionic/vue';
import { add, funnel } from 'ionicons/icons';
import WishlistModal from '@/modals/WishlistModal.vue';
import { Preferences } from '@capacitor/preferences';

enum SortType {
  'number',
  'string'
}

const KEY = 'MY_ITEMS';

const items = ref<WishlistItem[]>([]);

const sortBy = ref('rating');
const sortAsc = ref(true);
const sortType = ref<SortType>(SortType.number);

const sortedItems = computed(() => {
  const arr = items.value.slice();
  const key = sortBy.value;
  const asc = sortAsc.value;
  if (sortType.value === SortType.number) {
    if (asc) {
      return arr.sort((a, b) => (a[key] || 0) - (b[key] || 0));
    }
    return arr.sort((b, a) => (a[key] || 0) - (b[key] || 0));
  }

  return arr.sort((a, b) => a[key].localeCompare(b[key]));
});

onMounted(() => {
  loadItems();
});

const onFilter = () => {
  sortAsc.value = !sortAsc.value;
};

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

.filter {
  position: fixed;
  right: 1rem;
  top: 1rem;
  z-index: 1000;
}
</style>
