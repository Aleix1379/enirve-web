import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private readonly serverUrl = 'http://192.168.1.35:3000';

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

  public getApiUrl(path: string) {
    return `${this.serverUrl}/api/v1${path}`;
  }

}
