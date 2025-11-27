import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkLoginStatus();
  }

  /** ✅ Check if token/user info exists in localStorage */
private hasToken(): boolean {
  return !!localStorage.getItem('loggedInUser');
}


  checkLoginStatus(): void {
    this.http.get('/api/method/frappe.auth.get_logged_user', { withCredentials: true })
      .pipe(
        map(() => true),
        catchError(() => of(false))
      )
      .subscribe(isLogged => {
        this.isLoggedInSubject.next(isLogged);
        if (isLogged) {
          localStorage.setItem('loggedInUser', 'true');
        } else {
          localStorage.removeItem('loggedInUser');
        }
      });
  }

  setLogin(): void {
    this.isLoggedInSubject.next(true);
    localStorage.setItem('loggedInUser', 'true');
  }

  setLogout(): void {
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('loggedInUser');
  }

  getStatus(): Observable<boolean> {
    return this.isLoggedIn$;
  }
}
