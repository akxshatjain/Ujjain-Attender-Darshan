// src/app/services/attender.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { map, catchError,tap } from 'rxjs/operators'; // ✅ Add this line
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  
  providedIn: 'root'
})
export class AttenderService {

  constructor(private http: HttpClient, private router: Router,private auth: AuthService) {}

loginVerify(phone: string, password: string): Observable<any> {
  const body = new URLSearchParams();
  body.set('usr', phone);
  body.set('pwd', password);

  return this.http.post('/api/method/login', body.toString(), {
    withCredentials: true,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }).pipe(
    tap(() => {
      localStorage.setItem('user', phone);
      this.auth.setLogin();          // ✅ update BehaviorSubject instantly
      this.auth.checkLoginStatus();  // ✅ verify backend session (optional but safe)
    }),
    catchError((err) => {
      this.auth.setLogout();
      throw err;
    })
  );
}




  getAttenderAppointmentsList(appointment_date: string | null): Observable<any> {
    return this.http.post(
      '/api/method/mahakaal.darshan_booking.doctype.darshan_attender_profile.darshan_attender_profile.get_attender_appointments_list',
      { appointment_date },
      { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
    );
  }
  
  getAppointmentStats(): Observable<any> {
    return this.http.post(
      '/api/method/mahakaal.darshan_booking.doctype.darshan_attender_profile.darshan_attender_profile.get_appointment_stats',
      {},
      { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
    );
  }

getLoggedUser(): Observable<boolean> {
  return this.http.get('/api/method/frappe.auth.get_logged_user', {
    withCredentials: true
  }).pipe(
    map((res: any) => {
      // If API returns a user, you’re logged in
      if (res?.message) {
        return true;
      }
      return false;
    }),
    catchError(() => of(false))
  );
}



  markExit(appointment_id: string): Observable<any> {
  return this.http.post(
    '/api/method/mahakaal.darshan_booking.doctype.darshan_attender_profile.darshan_attender_profile.mark_exit',
    { appointment_id },
    { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
  );
}
getAppointmentDetails(appointment_id: string): Observable<any> {
  return this.http.post(
    '/api/method/mahakaal.darshan_booking.doctype.darshan_attender_profile.darshan_attender_profile.get_attender_appointment',
    { appointment_id },
    { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
  );
}

// Add this method
  logoutUser(): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post('/api/method/logout', {}, { headers, withCredentials: true })
      .subscribe({
        next: () => this.clearFrontendData(),
        error: () => this.clearFrontendData()
      });
  }

private clearFrontendData(): void {
  localStorage.removeItem('user');
  localStorage.removeItem('user_phone_number');
  this.auth.setLogout(); // ✅ update auth flag
  setTimeout(() => this.router.navigate(['homepage']), 100);
}

getSelfProfile(): Observable<any> {
  return this.http.post(
    '/api/method/mahakaal.darshan_booking.doctype.darshan_attender_profile.darshan_attender_profile.get_self_profile',
    {},
    { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
  ).pipe(
    map((res: any) => res?.message?.profile || null), // ✅ FIXED PATH
    catchError((err) => {
      console.error('Error fetching profile details:', err);
      return of(null);
    })
  );
}


updateProfile(info: any): Observable<any> {
  return this.http.post(
    '/api/method/mahakaal.darshan_booking.doctype.darshan_attender_profile.darshan_attender_profile.update_profile',
    { info },
    { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
  ).pipe(
    map((res: any) => res?.message || 'Profile saved.'),
    catchError((err) => {
      console.error('Error updating profile:', err);
      return of('Failed to update profile.');
    })
  );
}





}
