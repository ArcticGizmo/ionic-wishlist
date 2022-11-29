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
import { ref } from 'vue';
import ItemCard from '@/components/ItemCard.vue';
import BasePage from './BasePage.vue';
import { WishlistItem } from '@/types';
import { IonFabButton, IonIcon, modalController } from '@ionic/vue';
import { add } from 'ionicons/icons';
import WishlistModal from '@/modals/WishlistModal.vue';

const items = ref<WishlistItem[]>([
  {
    name: 'Watch A something something',
    src: 'https://www.fossil.com/on/demandware.static/-/Library-Sites-FossilSharedLibrary/default/dwa0f05dff/2022/FA22/set_0801_global/dgp_watches/0801_DGP_Mens-Stainless.jpg',
    brand: 'fossil',
    price: 450,
    rating: 5
  },
  {
    name: 'Watch A',
    src: 'https://fossil.scene7.com/is/image/FossilPartners/LE1156_main?$sfcc_fos_hi-res$',
    brand: 'fossil',
    price: 450,
    rating: 5
  },
  {
    name: 'Watch A',
    src: 'https://myer-media.com.au/wcsstore/MyerCatalogAssetStore/images/10/105/1511/402/1/921152080/921152080_1_360x464.webp',
    brand: 'fossil',
    price: 450,
    rating: 5
  },
  {
    name: 'Watch A',
    src: 'https://www.fossil.com/on/demandware.static/-/Library-Sites-FossilSharedLibrary/default/dwa0f05dff/2022/FA22/set_0801_global/dgp_watches/0801_DGP_Mens-Stainless.jpg',
    brand: 'fossil',
    price: 450,
    rating: 5
  },
  {
    name: 'Watch A',
    brand: 'fossil',
    price: 450,
    rating: 5
  }
]);

const onAdd = async () => {
  const modal = await modalController.create({ component: WishlistModal });
  await modal.present();
  const resp = await modal.onDidDismiss<WishlistItem>();
  if (resp?.data) {
    items.value.push(resp.data);
  }
};

const onEdit = async (item: WishlistItem, index: number) => {
  const modal = await modalController.create({ component: WishlistModal, componentProps: { item } });
  await modal.present();
  const resp = await modal.onDidDismiss<WishlistItem>();
  if (resp?.data) {
    items.value[index] = resp.data;
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
