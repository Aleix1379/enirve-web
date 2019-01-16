import {Injectable} from '@angular/core';

@Injectable()
export class CommonService {

  private static apiUrl = 'http://localhost:3000/api/v1';

  constructor() {
  }

  public static getApiUrl(path: string): string {
    if (!path) {
      return this.apiUrl;
    }
    return `${this.apiUrl}${path}`;
  }

}
