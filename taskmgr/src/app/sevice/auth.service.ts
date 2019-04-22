import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../domain/user.model';
import {Observable} from 'rxjs';
import {Auth} from '../domain/auth';
import {map, switchMap} from 'rxjs/operators';

@Injectable()
export class AuthService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
    '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9' +
    '.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
  private readonly domain = 'users';

  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) { }

  /**
   * 使用用户提供的个人信息进行注册，成功则返回 User，否则抛出异常
   *
   * @param user 用户信息，id 属性会被忽略，因为服务器端会创建新的 id
   */
  register(user: User): Observable<Auth> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get(uri, {params: {'email': user.email}}).pipe(
      switchMap(res => {
        const str = res as string;
        if (str.length > 0) {
          throw new Error('username existed');
        }
        return this.http.post(uri, JSON.stringify(user), {headers: this.headers}).pipe(
          map(r => ({token: this.token, user: r as User}))
        );
      })
    );
  }

  /**
   * 使用用户名和密码登录
   *
   * @param username 用户名
   * @param password 密码（明文），服务器会进行加密处理
   */
  login(email: string, password: string): Observable<Auth> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get(uri, {params: {'email': email, 'password': password}}).pipe(
      map(res => {
        const str = res as string;
        if (str.length > 0) {
          throw new Error('Login Failed');
        }
        return {
          token: this.token,
          user: res[0] as User
        };
      })
    );
  }
}
