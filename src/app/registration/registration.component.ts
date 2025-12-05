import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AttenderService } from '../services/attender.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.component.html'
})
export class RegistrationComponent {

  phone: number | null = null;
  loading = false;

  constructor(
    private attenderService: AttenderService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onRegister(event: Event) {
    event.preventDefault();

    if (!this.phone) return;

    this.loading = true;

    this.attenderService.createAttender(this.phone).subscribe({
      next: (res: any) => {
        if (res?.message) {
          this.toastr.success("Registration Successful");
          
          // Save phone like Svelte store
          localStorage.setItem("user_phone_number", String(this.phone));

          this.router.navigate(['/login']);
        } else {
          this.toastr.error("Registration failed");
          this.loading = false;
        }
      },
      error: () => {
        this.toastr.error("Registration failed");
        this.loading = false;
      }
    });
  }
}
