// src/app/services/attender.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AttenderService {

  //  Change IP here only
  BASE_IP = "http://10.120.9.42:8890/";
  

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {}

  // ✅ LOGIN
  loginVerify(phone: string): Observable<any> {
    const url = `${this.BASE_IP}/api/method/mahakaal.darshan_booking.doctype.session_login.session_login.get_auth_token`;

    return this.http.post(
      url,
      { phone: phone + "" },
      { headers: { "Content-Type": "application/json" } }
    ).pipe(
      tap((res: any) => {
        if (res?.message?.token) {
          localStorage.setItem("auth_token", res.message.token);
        }
      })
    );
  }

  //  token header
  private authHeaders(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("auth_token") || ""
    });
  }

  // ✅ Attender Appointments List
  getAttenderAppointmentsList(appointment_date: string | null): Observable<any> {
    const url = `${this.BASE_IP}/api/method/mahakaal.darshan_booking.doctype.darshan_attender_profile.darshan_attender_profile.get_attender_appointments_list`;

    return this.http.post(url, { appointment_date }, { headers: this.authHeaders() });
  }

  // ✅ Stats
  getAppointmentStats(): Observable<any> {
    const url = `${this.BASE_IP}/api/method/mahakaal.darshan_booking.doctype.darshan_attender_profile.darshan_attender_profile.get_appointment_stats`;

    return this.http.post(url, {}, { headers: this.authHeaders() });
  }

  // ✅ Logged user
  getLoggedUser(): Observable<boolean> {
    const url = `${this.BASE_IP}/api/method/frappe.auth.get_logged_user`;

    return this.http.get(url, { headers: this.authHeaders() }).pipe(
      map((res: any) => !!res?.message),
      catchError(() => of(false))
    );
  }

  // ✅ Mark Exit
  markExit(appointment_id: string): Observable<any> {
    const url = `${this.BASE_IP}/api/method/mahakaal.darshan_booking.doctype.darshan_attender_profile.darshan_attender_profile.mark_exit`;

    return this.http.post(url, { appointment_id }, { headers: this.authHeaders() });
  }

  // ✅ Appointment Details
  getAppointmentDetails(appointment_id: string): Observable<any> {
    const url = `${this.BASE_IP}/api/method/mahakaal.darshan_booking.doctype.darshan_attender_profile.darshan_attender_profile.get_attender_appointment`;

    return this.http.post(url, { appointment_id }, { headers: this.authHeaders() });
  }

  // ✅ Logout
logoutUser(): void {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('loggedInUser');     // ✅ FIX
  localStorage.removeItem('user');
  localStorage.removeItem('user_phone_number');

  this.auth.setLogout();
  this.router.navigate(['homepage']);
}


  // ✅ Self Profile
  getSelfProfile(): Observable<any> {
    const url = `${this.BASE_IP}/api/method/mahakaal.darshan_booking.doctype.darshan_attender_profile.darshan_attender_profile.get_self_profile`;

    return this.http.post(url, {}, { headers: this.authHeaders() }).pipe(
      map((res: any) => res?.message?.profile || null),
      catchError((err) => {
        console.error('❌ Error fetching profile:', err);
        return of(null);
      })
    );
  }

  // ✅ Update Profile
  updateProfile(info: any): Observable<any> {
    const url = `${this.BASE_IP}/api/method/mahakaal.darshan_booking.doctype.darshan_attender_profile.darshan_attender_profile.update_profile`;

    return this.http.post(url, { info }, { headers: this.authHeaders() }).pipe(
      map((res: any) => res?.message || 'Profile saved.'),
      catchError((err) => {
        console.error('❌ Error updating profile:', err);
        return of('Failed to update profile.');
      })
    );
  }

}
