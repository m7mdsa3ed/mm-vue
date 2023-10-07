export default class LocalStorageCache {
  _getKey(key) {
    const prefix = import.meta.env.VITE_LOCALSTORAGE_NAMESPACE ?? "mm"

    return `${prefix}.${key}`;
  }

  get(key) {
    return localStorage.getItem(this._getKey(key));
  }

  set(key, value) {
    localStorage.setItem(this._getKey(key), value);

    return this;
  }

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    localStorage.removeItem(this._getKey(key));

    return this;
  }
}