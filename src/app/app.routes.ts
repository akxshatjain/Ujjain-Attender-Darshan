import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from './services/auth.guard';
import { ViewAttenderProfileComponent } from './view-attender-profile/view-attender-profile.component';
import { UpdateAttenderProfileComponent } from './update-attender-profile/update-attender-profile.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ViewAttenderProfileComponent, canActivate: [AuthGuard] },
  { path: 'updateprofile', component: UpdateAttenderProfileComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: '**', redirectTo: 'homepage' },
];
