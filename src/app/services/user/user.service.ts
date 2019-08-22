import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ActivityUpdateProgress, User} from '../../interfaces/User';
import {SharedService} from '../shared/shared.service';
import {Token} from '../../interfaces/Token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = this.shared.getApiUrl('/users');
  private tokenUrl = this.shared.getApiUrl('/tokens');

  constructor(private http: HttpClient,
              private shared: SharedService) {
  }

  public find(key: string, value: string | number): Observable<User> {
    console.log(`userUrl`);
    console.log(`${this.userUrl}?${key}=${value}`);

    return this.http.get<User>(`${this.userUrl}?${key}=${value}`);
  }

  public create(data: User): Observable<User> {
    return this.http.post<User>(this.userUrl, data);
  }

  public createToken(email: string, password: string): Observable<Token> {
    return this.http.post<Token>(this.tokenUrl, {email, password});
  }

  public updateProgress(data: ActivityUpdateProgress): Observable<User> {
    return this.http.put<User>(`${this.userUrl}/progress`, data);
  }

}
