import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
    private baseUrl = `${environment.backendUrl}/auth`;

  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }  

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  forgotPassword(data: { email: string }) {
    return this.http.post(`${this.baseUrl}/forgot-password`, data);
  }
  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.loggedInSubject.next(false);
  }

  setLoggedInState() {
    this.loggedInSubject.next(true);
  }
}
