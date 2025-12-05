import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard, LogoutGuard } from './services/auth.guard'; // ✅ both imported
import { ViewAttenderProfileComponent } from './view-attender-profile/view-attender-profile.component';
import { UpdateAttenderProfileComponent } from './update-attender-profile/update-attender-profile.component';
import { RegistrationComponent } from './registration/registration.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LogoutGuard] },
  { path: 'homepage', component: HomepageComponent, canActivate: [LogoutGuard] },
  { path: 'registration', component: RegistrationComponent, canActivate: [LogoutGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ViewAttenderProfileComponent, canActivate: [AuthGuard] },
  { path: 'updateprofile', component: UpdateAttenderProfileComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: '**', redirectTo: 'homepage' },
];
