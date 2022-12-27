<template>
  <BasePage class="home-page" title="Home">
    <ion-fab-button class="add-item">
      <ion-icon :icon="add" @click="onAdd()" />
    </ion-fab-button>
    <div class="collection">
      <CollectionCard
        v-for="(w, index) of wishlists"
        :key="index"
        :text="w.name"
        :color="COLORS[index % COLORS.length]"
        @click="onNavigate(w.id)"
      />
    </div>
  </BasePage>
</template>

<script setup lang="ts">
import CollectionCard from '@/components/CollectionCard.vue';
import { useWishlistStore } from '@/composables/wishlistStore';
import BasePage from './BasePage.vue';
import { useIonRouter, IonFabButton, IonIcon, alertController, AlertOptions, toastController } from '@ionic/vue';
import { add } from 'ionicons/icons';

const COLORS = ['#ea9acd', '#9ffadd', '#b29690', '#e0b294', '#ec9eae', '#88b6d0', '#80ffb4', '#d6feab'];

const router = useIonRouter();

const { wishlists, addWishlist } = useWishlistStore();

const onNavigate = async (id: string) => {
  router.push(`/collection/${id}`);
};

const onAdd = async () => {
  const opts: AlertOptions = {
    header: 'Name Collection',
    buttons: ['Ok'],
    inputs: [
      {
        name: 'collectionName',
        placeholder: 'Example: Cars'
      }
    ]
  };
  const alert = await alertController.create(opts);
  await alert.present();
  const resp = await alert.onDidDismiss();

  if (resp.role) {
    return;
  }

  const collectionName = resp?.data?.values?.collectionName;

  if (!collectionName) {
    const toast = await toastController.create({ message: 'Your collection needs a name!', duration: 3000 });
    await toast.present();
    return;
  }

  await addWishlist(collectionName);
  const toast = await toastController.create({ message: 'Collection created!', duration: 3000 });
  await toast.present();
};
</script>

<style>
.add-item {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 1000;
}

.collection {
  display: grid;
  grid-template-columns: auto;
}

@media only screen and (min-width: 450px) {
  .collection {
    display: grid;
    grid-template-columns: auto auto;
  }
}

@media only screen and (min-width: 700px) {
  .collection {
    display: grid;
    grid-template-columns: auto auto auto;
  }
}

@media only screen and (min-width: 1000px) {
  .collection {
    display: grid;
    grid-template-columns: auto auto auto auto;
  }
}
</style>
