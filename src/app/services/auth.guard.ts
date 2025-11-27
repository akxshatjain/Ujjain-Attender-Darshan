import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.getStatus().pipe(
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}


/** ✅ Add this guard to restrict access to logged-out-only routes */
@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.getStatus().pipe(
      map(isLoggedIn => !isLoggedIn), // allow only if user is NOT logged in
      tap(canAccess => {
        if (!canAccess) {
          this.router.navigate(['/dashboard']); // redirect if already logged in
        }
      })
    );
  }
}
