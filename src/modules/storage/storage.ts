import webStorageKeys from "./web-storage-keys";
import {ItemDestruction, Keys, MultipleItem, TargetStorage} from "./types";
import {checkIsJSON, checkIsPrimitive} from "./helpers";

class WebStorage {
  storage: typeof localStorage | typeof sessionStorage

  constructor(storage: TargetStorage) {
    this.storage = window[storage]
  }

  get(key: Keys): string | null {
    try {
      const value = this.storage.getItem(key.toString())!?.toString()
      const isJson = checkIsJSON(value!?.toString())
      return isJson ? JSON.parse(value) : value
    } catch (err) {
      console.error(`cannot retrieve ${key}`, err)
      return null
    }
  }

  getMultiple(keys: Keys[]) {
    try {
      let items: MultipleItem = {}
      let i = keys.length
      while (i--) items[keys[i]] = this.get(keys[i])

      return items
    } catch (err) {
      console.error('could not retrieve keys', err)
    }
  }

  get allItems(): MultipleItem {
    let items: MultipleItem = {}
    try {
      let keys = Object.keys(this.storage) as Array<Keys>
      let i = keys.length
      while (i--) items[keys[i]] = this.get(keys[i])
      return items
    } catch (err) {
      console.error('err in ls get all', err)
      return items
    }
  }

  set(key: Keys, value: any) {
    try {
      const isPrimitive = checkIsPrimitive(value)
      const updatedValue = isPrimitive ? value : JSON.stringify(value)
      this.storage.setItem(key, updatedValue)
    } catch (err) {
      console.error(`err in setting ${key}`, err)
    }
  }

  setMultiple(items: MultipleItem) {
    try {
      Object.entries(items).forEach(([key, value]: ItemDestruction) => {
        this.set(key, value)
      })
    } catch (err) {
      console.error(`err in setting keys`, err)
    }
  }

  remove(key: Keys) {
    try {
      return this.storage.removeItem(key)
    } catch (err) {
      console.error(`err while removing ${key}`, err)
    }
  }

  removeMultiple(keys: Keys[]) {
    try {
      return keys.forEach((k) => this.remove(k))
    } catch (err) {
      console.error(`err in removing entries`, err)
    }
  }

  clear() {
    try {
      return this.storage.clear()
    } catch (err) {
      console.error(`err in clearing ${this.storage} data`, err)
    }
  }
}

const ls = new WebStorage('localStorage')
const session = new WebStorage('sessionStorage')

export { ls, session }
