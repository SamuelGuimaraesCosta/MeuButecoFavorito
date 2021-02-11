import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { Storage } from '@ionic/storage';
import { User } from './user';
import { AuthResponse } from './auth-response';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private AUTH_SERVER_ADDRESS: string = 'http://localhost:3000';
  public authSubject = new BehaviorSubject(false);

  constructor(
    private httpClient: HttpClient,
    private storage: Storage,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/register`, user).pipe(
      tap(async (res: AuthResponse) => {
        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.TOKEN);
          await this.storage.set("EXPIRES_IN", res.EXPIRE);
          await this.storage.set("USER_INFO", res.user);
          this.authSubject.next(true);
        }
      }), catchError((error: HttpErrorResponse): Observable<any> => {
        return throwError(error);
      }), catchError(error => {
        return throwError({ "error": error.statusText, "code": error.status });
      })
    );
  }

  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`, user).pipe(
      tap(async (res: AuthResponse) => {
        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.TOKEN);
          await this.storage.set("EXPIRES_IN", res.EXPIRE);
          await this.storage.set("USER_INFO", res.user);
          this.authSubject.next(true);
        }
      }), catchError((error: HttpErrorResponse): Observable<any> => {
        return throwError(error);
      }), catchError(error => {
        return throwError({ "error": error.statusText, "code": error.status });
      })
    );
  }

  async logout() {
    await this.storage.remove("ACCESS_TOKEN");
    await this.storage.remove("EXPIRES_IN");
    await this.storage.remove("USER_INFO");
    this.authSubject.next(false);
  }

  ifLoggedIn() {
    this.storage.get("USER_INFO").then((response) => {
      if (response) {
        this.authSubject.next(true);
      }
    });
  }

  isAuthenticated() {
    return this.authSubject.value;
  }
}
