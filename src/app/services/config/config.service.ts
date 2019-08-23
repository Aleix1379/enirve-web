import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SharedService} from '../shared/shared.service';
import {Observable} from 'rxjs';
import {Config} from '../../interfaces/Config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private apiUrl = this.sharedService.getApiUrl('users');
  private path = 'config';

  constructor(private http: HttpClient,
              private sharedService: SharedService) {
  }

  public getConfig(userCode: number): Observable<Config> {
    return this.http.get<Config>(this.formatUrl(userCode));
  }

  public updateConfig(userCode: number, data: Config): Observable<Config> {
    return this.http.put<Config>(this.formatUrl(userCode), data);
  }

  private formatUrl(userCode: number): string {
    return `${this.apiUrl}/${userCode}/${this.path}`;
  }

}
