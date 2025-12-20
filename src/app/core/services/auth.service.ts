import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, AuthCredentials, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser$ = new BehaviorSubject<User | null>(null);

  getCurrentUser(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }

  isAuthenticated(): Observable<boolean> {
    return new Observable(observer => {
      observer.next(this.currentUser$.value !== null);
      observer.complete();
    });
  }

  login(credentials: AuthCredentials): Observable<AuthResponse> {
    // TODO: Implementar login contra API
    return new Observable(observer => {
      observer.next({ token: '', user: {} as User });
      observer.complete();
    });
  }

  register(credentials: AuthCredentials & { firstName: string; lastName: string }): Observable<AuthResponse> {
    // TODO: Implementar registro contra API
    return new Observable(observer => {
      observer.next({ token: '', user: {} as User });
      observer.complete();
    });
  }

  logout(): void {
    this.currentUser$.next(null);
    localStorage.removeItem('authToken');
  }

  setCurrentUser(user: User): void {
    this.currentUser$.next(user);
  }
}
