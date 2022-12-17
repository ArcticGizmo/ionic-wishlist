import { writeToStore, loadFromStore } from '@/code/persistence';
import { Wishlist, WishlistItem } from '@/types';
import { readonly, ref } from 'vue';

const OLD_KEY = 'MY_ITEMS';
const STORE_ID = 'WHISHLISTS';

const isLoading = ref(true);
const STATE = ref<Wishlist[]>([]);

export const migrate = async () => {
  const resp = await loadFromStore<WishlistItem[]>(OLD_KEY);

  if (!resp?.length) {
    return;
  }

  const data: Wishlist = {
    name: 'watches',
    items: resp
  };

  await save([data]);
  STATE.value = [data];
};

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

export const useWishlistStore = () => {
  const addWishlist = async (name: string) => {
    console.dir(name);
  };

  const removeWishlist = async (name: string) => {
    console.dir(name);
  };

  const updateWishlist = async (name: string, items: WishlistItem[]) => {
    const wishlist = STATE.value.find(w => w.name === name) as Wishlist;
    wishlist.items = items;
    await save(STATE.value);
  };

  return { wishlists: STATE, isLoading: readonly(isLoading), addWishlist, removeWishlist, updateWishlist };
};
