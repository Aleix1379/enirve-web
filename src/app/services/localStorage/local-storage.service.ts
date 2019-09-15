import {Injectable} from '@angular/core';
import {Config} from '../../interfaces/Config';
import {Token} from '../../interfaces/Token';
import {User} from '../../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  /**
   * value = storage[key]
   */
  private static getItem<T>(key: 'config' | 'auth-token' | 'user-connected'): T {
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
  private static key(index: number): string | null {
    return localStorage.key(index);
  }

  /**
   * delete storage[key]
   */
  private static removeItem(key: 'config' | 'auth-token' | 'user-connected'): void {
    localStorage.removeItem(key);
  }

  /**
   * storage[key] = value
   */
  private static setItem<T>(key: 'config' | 'auth-token' | 'user-connected', value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  constructor() {
  }

  /**
   * Empties the list associated with the object of all key/value pairs, if there are any.
   */
  clear(): void {
    localStorage.clear();
  }

  public getConfig(): Config {
    return LocalStorageService.getItem('config');
  }

  public getAuthToken(): Token {
    return LocalStorageService.getItem('auth-token');
  }

  public getUserConnected(): User {
    return LocalStorageService.getItem('user-connected');
  }

  public setConfig(config: Config): void {
    LocalStorageService.setItem('config', config);
  }

  public setAuthToken(authToken: Token): void {
    LocalStorageService.setItem('auth-token', authToken);
  }

  public setUserConnected(userConnected: User): void {
    LocalStorageService.setItem('user-connected', userConnected);
  }

  public removeConfig() {
    LocalStorageService.removeItem('config');
  }
  public removeAuthToken() {
    LocalStorageService.removeItem('auth-token');
  }
  public removeUser() {
    LocalStorageService.removeItem('user-connected');
  }

}
