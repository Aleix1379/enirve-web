import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private readonly serverUrl = environment.serverUrl;

  private data = {};

  constructor() {
  }

  set(key: string, value: any) {
    this.data[key] = value;
  }

  get(key: string, autoClean = true) {
    const value = this.data[key];
    if (autoClean) {
      delete this.data[key];
    }
    return value;
  }

  remove(key: string) {
    delete this.data[key];
  }

  public getImageUrl(imageName: string): string {
    if (imageName) {
      return `${this.serverUrl}/public/images/${imageName}`;
    }
    return `${this.serverUrl}/public/images`;
  }

  public getApiUrl(path: string) {
    if (!path.startsWith('/')) {
      path = `/${path}`;
    }
    return `${this.serverUrl}/api/v1${path}`;
  }

}
