<template>
  <BasePage title="Tab 2">
    <ion-button @click="onDownload">Download File</ion-button>
    <ion-button @click="onUpload">Upload File</ion-button>
    <ion-button @click="onMigrate">Migrate</ion-button>
    {{ wishlists.length }}
  </BasePage>
</template>

<script setup lang="ts">
import { WishlistItem } from '@/types';
import { Preferences } from '@capacitor/preferences';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { IonButton } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import BasePage from './BasePage.vue';
import { useWishlistStore, migrate } from '@/composables/wishlistStore';

const KEY = 'MY_ITEMS';

const items = ref<WishlistItem[]>([]);

const { wishlists } = useWishlistStore();

const loadItems = async () => {
  const data = await Preferences.get({ key: KEY });
  if (data.value) {
    items.value = JSON.parse(data.value);
  }
};

const onDownload = async () => {
  await Filesystem.writeFile({
    path: 'ionic-wishlist/backup.json',
    data: JSON.stringify(items.value, null, 2),
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
    recursive: true
  });
};

const onUpload = async () => {
  const resp = await Filesystem.readFile({
    path: 'ionic-wishlist/backup.json',
    directory: Directory.Documents,
    encoding: Encoding.UTF8
  });

  console.dir(JSON.parse(resp.data));
};

const onMigrate = async () => {
  await migrate();
};

onMounted(() => {
  loadItems();
});
</script>
