import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AttenderService } from '../services/attender.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  userLoggedIn$!: Observable<boolean>;
  menuOpen = false;

  constructor(
    private authService: AuthService,
    private attenderService: AttenderService,
    private router: Router,
    private toastr: ToastrService

  ) {}

  ngOnInit(): void {
    // ✅ subscribe to reactive login status from AuthService
    this.userLoggedIn$ = this.authService.isLoggedIn$;
  }

  goBack() {
    window.history.back();
  }

  goForward() {
    window.history.forward();
  }

  logout() {
    this.attenderService.logoutUser();
    this.toastr.success("Logout successful");

  }
}
