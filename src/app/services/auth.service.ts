import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkLoginStatus(); // Check login on app load
  }

  /** Check backend session status */
  checkLoginStatus(): void {
    this.http.get('/api/method/frappe.auth.get_logged_user', { withCredentials: true })
      .pipe(
        map(() => true),
        catchError(() => of(false))
      )
      .subscribe(isLogged => this.isLoggedInSubject.next(isLogged));
  }

  /** Manually mark as logged in (after successful login) */
  setLogin(): void {
    this.isLoggedInSubject.next(true);
  }

  /** Manually mark as logged out */
  setLogout(): void {
    this.isLoggedInSubject.next(false);
  }

  /** Observable to get current status */
  getStatus(): Observable<boolean> {
    return this.isLoggedIn$;
  }
}
