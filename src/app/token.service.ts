import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {CommonService} from './common.service';

@Injectable()
export class TokenService {

  private apiUrl = CommonService.getApiUrl('/tokens');

  constructor(private http: HttpClient) { }

  public createToken (data): Observable<Object> {
    return this.http.post(this.apiUrl, data);
  }

}
