<template>
  <BasePage>
    <template v-slot:header>
      <ion-buttons slot="start">
        <ion-icon :icon="arrowBack" size="large" @click="onBack()" />
      </ion-buttons>
      <IonTitle @click="onChangeName()">{{ name }}</IonTitle>
      <ion-buttons slot="end">
        <ion-icon class="edit" :icon="trash" @click="onDelete()" />
      </ion-buttons>
    </template>
    <div v-if="isInvalid" class="error">
      <h3>
        Seems we have missplaced collection <br />
        '{{ name }}'
      </h3>
      <ion-button @click="onBack()">Back to collections</ion-button>
    </div>
    <div v-else-if="isLoading">Loading</div>
    <template v-else>
      <ion-fab-button class="filter">
        <ion-icon :icon="funnel" @click="onFilter()" />
      </ion-fab-button>
      <ion-fab-button class="add-item">
        <ion-icon :icon="add" @click="onAdd()" />
      </ion-fab-button>
      <div class="items">
        <ItemCard v-for="item in sortedItems" :key="item.index" :item="item.item" @click="onEdit(item.item)" />
      </div>
    </template>
  </BasePage>
</template>

<script setup lang="ts">
import { useWishlistItems } from '@/composables/wishlistStore';
import { ref, computed } from 'vue';
import BasePage from './BasePage.vue';
import {
  IonButton,
  useIonRouter,
  IonTitle,
  IonButtons,
  IonIcon,
  AlertOptions,
  alertController,
  toastController,
  IonFabButton,
  modalController
} from '@ionic/vue';
import { trash, arrowBack } from 'ionicons/icons';
import { add, funnel } from 'ionicons/icons';
import { SortFilterConfig, SortType, WishlistItem } from '@/types';

import WishlistModal from '@/modals/WishlistModal.vue';
import ItemCard from '@/components/ItemCard.vue';
import SortFilterModal from '@/modals/SortFilterModal.vue';
import { SortedItem, sortItems } from '@/code/filter';

const props = defineProps({
  id: { type: String, required: true }
});

const router = useIonRouter();

const { name, items, isLoading, isInvalid, changeName, addItem, removeItem, updateItem, remove } = useWishlistItems(
  props.id
);

const sortFilterConfig = ref<SortFilterConfig>({
  sortBy: 'rating',
  sortAsc: false,
  sortType: SortType.number
});

const sortedItems = computed<SortedItem<WishlistItem>[]>(() => sortItems(items.value, sortFilterConfig.value));

const onBack = async () => {
  router.canGoBack() ? router.back() : router.navigate({ name: 'Home' });
};

const onFilter = async () => {
  const modal = await modalController.create({
    component: SortFilterModal,
    componentProps: {
      options: [
        { name: 'rating', type: SortType.number },
        { name: 'price', type: SortType.number },
        { name: 'name', type: SortType.string },
        { name: 'brand', type: SortType.string }
      ],
      config: sortFilterConfig.value
    }
  });
  await modal.present();
  const resp = await modal.onDidDismiss<SortFilterConfig>();
  if (resp.data) {
    sortFilterConfig.value = resp.data;
  }
};

const onChangeName = async () => {
  const opts: AlertOptions = {
    header: 'Name Collection',
    buttons: ['Ok'],
    inputs: [
      {
        name: 'collectionName',
        placeholder: 'Example: Cars',
        value: name.value
      }
    ]
  };
  const alert = await alertController.create(opts);
  await alert.present();
  const resp = await alert.onDidDismiss();

  const newName = resp?.data?.values?.collectionName;

  if (newName === name.value) {
    return;
  }

  if (!newName) {
    const toast = await toastController.create({ message: 'Your collection needs a name!', duration: 3000 });
    await toast.present();
    return;
  }

  changeName(newName);

  const toast = await toastController.create({ message: 'Name updated!', duration: 3000 });
  await toast.present();
};

const onDelete = async () => {
  await remove();
  const toast = await toastController.create({ message: 'Deleted!', duration: 3000 });
  await toast.present();
  onBack();
};

const onAdd = async () => {
  const modal = await modalController.create({ component: WishlistModal });
  await modal.present();
  const resp = await modal.onDidDismiss<WishlistItem>();
  if (resp?.data) {
    await addItem(resp.data);
  }
};

const onEdit = async (item: WishlistItem) => {
  const modal = await modalController.create({ component: WishlistModal, componentProps: { item, canDelete: true } });
  await modal.present();
  const resp = await modal.onDidDismiss<WishlistItem>();

  if (resp.role === 'destructive') {
    await removeItem(item.id);
    return;
  }

  if (resp?.data) {
    await updateItem(item.id, resp.data);
  }
};
</script>

<style scoped>
.items {
  padding-top: 1rem;
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
  top: 4rem;
  z-index: 1000;
}

.error {
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
}

ion-title {
  text-align: center;
}

.edit {
  font-size: 24px;
  padding-right: 0.5rem;
}
</style>
