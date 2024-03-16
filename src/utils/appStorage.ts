import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

export const appStorage = {
  setItem: (key: string, value: string | number | boolean) => {
    storage.set(key, value);
  },
  getItem: (key: string) => {
    return storage.getString(key) || null;
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
  hasKey: (key: string) => {
    storage.contains(key);
  },
  getAllKeys: () => {
    storage.getAllKeys();
  },
  clearItems: () => {
    storage.clearAll();
  },
};
