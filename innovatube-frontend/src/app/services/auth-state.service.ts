import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));

  authStatus$ = this.loggedIn.asObservable();

  setLoggedIn(status: boolean) {
    this.loggedIn.next(status);
  }
}
