import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(<User>{});
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username: string) {
    return new Promise((resolve, reject) => {
      let user = {
        displayName: username
      };
      sessionStorage.setItem('loggedInUser', JSON.stringify(user));
      this.userSubject.next(user);
      resolve(user);
    });
  }

  logout() {
    sessionStorage.removeItem('loggedInUser');
    this.userSubject.next({});
    this.router.navigate(['/login']);
  }
}
