import { writeToStore, loadFromStore } from '@/code/persistence';
import { Wishlist, WishlistItem } from '@/types';
import { computed, readonly, ref } from 'vue';
import { v4 as createUuid } from 'uuid';

const STORE_ID = 'WHISHLISTS';

const isLoading = ref(true);
const STATE = ref<Wishlist[]>([]);

const save = async (wishlists: Wishlist[]) => {
  await writeToStore(STORE_ID, wishlists);
};

// load initially from store
loadFromStore<Wishlist[]>(STORE_ID)
  .then(resp => {
    if (resp) {
      STATE.value = resp;
    }
  })
  .finally(() => (isLoading.value = false));

const removeWishlist = async (id: string) => {
  STATE.value = STATE.value.filter(w => w.id !== id);
  await save(STATE.value);
};

export const useWishlistStore = () => {
  const addWishlist = async (name: string) => {
    STATE.value.push({ id: createUuid(), name, items: [] });
    await save(STATE.value);
  };

  const updateWishlist = async (name: string, items: WishlistItem[]) => {
    const wishlist = STATE.value.find(w => w.name === name) as Wishlist;
    wishlist.items = items;
    await save(STATE.value);
  };

  return {
    wishlists: STATE,
    isLoading: readonly(isLoading),
    addWishlist,
    removeWishlist,
    updateWishlist
  };
};

export const useWishlistItems = (id: string) => {
  const wishlist = computed(() => STATE.value.find(w => w.id === id));
  const isInvalid = computed(() => !isLoading.value && wishlist.value == null);

  const items = computed(() => wishlist.value?.items || []);
  const name = computed(() => wishlist.value?.name);

  const remove = async () => await removeWishlist(id);

  const addItem = async (item: WishlistItem) => {
    wishlist.value?.items.push({ ...item, id: createUuid() });
    await save(STATE.value);
  };

  const removeItem = async (id: string) => {
    if (!wishlist.value?.items?.length) {
      return;
    }

    wishlist.value.items = wishlist.value.items.filter(item => item.id !== id);
    await save(STATE.value);
  };

  const updateItem = async (id: string, item: WishlistItem) => {
    if (!wishlist.value?.items?.length) {
      return;
    }

    const index = wishlist.value.items.findIndex(item => item.id === id);

    if (index > -1) {
      wishlist.value.items[index] = { ...item, id };
      await save(STATE.value);
    }
  };

  const changeName = async (newName: string) => {
    if (!wishlist.value) {
      return;
    }
    wishlist.value.name = newName;
    await save(STATE.value);
    return true;
  };

  return {
    name,
    items,
    isLoading: readonly(isLoading),
    isInvalid: readonly(isInvalid),
    addItem,
    removeItem,
    updateItem,
    changeName,
    remove
  };
};
