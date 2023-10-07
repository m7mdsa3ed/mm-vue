import LocalStorageCache from "./Providers/LocalStorageCache"; 

export default class Cache {
  local() {
    return new LocalStorageCache()
  }
}