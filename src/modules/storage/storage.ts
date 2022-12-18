import webStorageKeys from "./web-storage-keys";
import {ItemDestruction, Keys, MultipleItem, TargetStorage} from "./types";
import {checkIsJSON, checkIsPrimitive} from "./helpers";

class WebStorage {
  storage: typeof localStorage | typeof sessionStorage;

  constructor(storage: TargetStorage) {
    this.storage = window[storage];
  }

  get(key: Keys): string | null {
    try {
      const value = this.storage.getItem(String(key));
      const isJson = checkIsJSON(value);
      return isJson ? JSON.parse(value) : value;
    } catch (e) {
      console.error("err in ls get", e);
      return null;
    }
  }

  getMultiple(keys: Keys[]) {
    try {
      let items: MultipleItem = {};
      let i = keys.length;
      while (i--) items[keys[i]] = this.get(keys[i]);

      return items;
    } catch (e) {
      console.error("err in ls get multi", e);
    }
  }

  get allItems(): MultipleItem {
    try {
      let items: MultipleItem = {};
      let keys = Object.keys(this.storage) as Array<Keys>;
      let i = keys.length;
      while (i--) items[keys[i]] = this.get(keys[i]);

      return items;
    } catch (e) {
      console.error("err in ls get all", e);
    }
  }

  set(key: Keys, value: any) {
    try {
      const isPrimitive = checkIsPrimitive(value);
      const updatedValue = isPrimitive ? value : JSON.stringify(value);
      this.storage.setItem(String(String(key)), updatedValue);
    } catch (e) {
      console.error("err in ls set", e);
    }
  }

  setMultiple(items: MultipleItem) {
    try {
      Object.entries(items).forEach(([key, value]: ItemDestruction) => {
        this.set(key, value);
      });
    } catch (e) {
      console.error("err in ls set multi", e);
    }
  }

  remove(key: Keys) {
    try {
      return this.storage.removeItem(String(key));
    } catch (e) {
      console.error("err in ls remove", e);
    }
  }

  removeMultiple(keys: Keys[]) {
    try {
      return keys.forEach((k) => this.remove(k));
    } catch (e) {
      console.error("err in ls remove multi", e);
    }
  }

  clear() {
    try {
      return this.storage.clear();
    } catch (e) {
      console.error("err in ls remove all", e);
    }
  }
}

const ls = new WebStorage("localStorage");
const session = new WebStorage("sessionStorage");

export {ls, session};
