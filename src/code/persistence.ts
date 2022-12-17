import { Preferences } from '@capacitor/preferences';
import { Ref, unref } from 'vue';

export const writeToStore = async (key: string, data: Ref<any> | any) => {
  const innerData = unref(data);
  await Preferences.set({ key, value: JSON.stringify(innerData) });
};

export const loadFromStore = async <T>(key: string): Promise<T | undefined> => {
  const data = await Preferences.get({ key });

  if (data.value == null) {
    return undefined;
  }
  try {
    return JSON.parse(data.value);
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
