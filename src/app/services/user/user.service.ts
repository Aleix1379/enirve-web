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

  public findByCode(userCode: string | number): Observable<User> {
    return this.findUser('code', userCode);
  }

  public find(key: string, value: string | number): Observable<User> {
    return this.findUser(key, value);
  }

  public filter(key: string, value: string | number): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}?${key}=${value}&search=true`);
  }

  private findUser(key: string, value: string | number): Observable<User> {
    return this.http.get<User>(`${this.userUrl}?${key}=${value}`);
  }

  public create(data: User): Observable<User> {
    return this.http.post<User>(this.userUrl, data);
  }

  public update(code: number, data: User): Observable<User> {
    return this.http.put<User>(`${this.userUrl}/${code}`, data);
  }

  public createToken(email: string, password: string): Observable<Token> {
    return this.http.post<Token>(this.tokenUrl, {email, password});
  }

  public updateProgress(data: ActivityUpdateProgress, userId: number): Observable<User> {
    return this.http.put<User>(`${this.userUrl}/${userId}/progress`, data);
  }

  public getFriends(userId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}/${userId}/friends`);
  }

  public follow(userId: number, friendCode: number): Observable<User> {
    return this.http.post<User>(`${this.userUrl}/${userId}/friends`, {userCode: friendCode});
  }


  public unfollow(userId: number, friendCode: number): Observable<User> {
    return this.http.delete<User>(`${this.userUrl}/${userId}/friends/${friendCode}`);
  }

}
