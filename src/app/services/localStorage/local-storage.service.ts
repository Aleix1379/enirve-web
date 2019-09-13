import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  /**
   * Empties the list associated with the object of all key/value pairs, if there are any.
   */
  clear(): void {
    localStorage.clear();
  }

  /**
   * value = storage[key]
   */
  getItem<T>(key: 'config' | 'auth-token' | 'user-connected'): T {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  }

  /**
   * Returns the name of the nth key in the list, or null if n is greater
   * than or equal to the number of key/value pairs in the object.
   */
  key(index: number): string | null {
    return localStorage.key(index);
  }

  /**
   * delete storage[key]
   */
  removeItem(key: 'config' | 'auth-token' | 'user-connected'): void {
    localStorage.removeItem(key);
  }

  /**
   * storage[key] = value
   */
  setItem<T>(key: 'config' | 'auth-token' | 'user-connected', value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

}
