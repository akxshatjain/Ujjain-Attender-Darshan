// src/app/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AttenderService } from '../services/attender.service';
import { ToastrService } from 'ngx-toastr'; // install via npm i ngx-toastr
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // <-- ADD THIS

@Component({
  imports:[CommonModule,ReactiveFormsModule,HttpClientModule,RouterModule ],
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private attenderService: AttenderService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
this.loginForm = this.fb.group({
  phone: ['555', Validators.required],
  password: ['Mpsedc123', Validators.required]
});


    // Simulate onMount behavior
    setTimeout(() => {
      const savedPhone = localStorage.getItem('user_phone_number');
      if (savedPhone) this.loginForm.patchValue({ phone: savedPhone });
      this.loading = false;
    }, 500);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    const { phone, password } = this.loginForm.value;

    this.attenderService.loginVerify(phone, password).subscribe({
      next: (res) => {
        this.loading = false;
        if (res?.full_name) {
          this.toastr.success('Login successful');
          localStorage.setItem('user_logged_in', 'true');
          localStorage.setItem('user_phone_number', phone);
          this.router.navigate(['dashboard']);
        } else {
          this.toastr.error(res?.message || 'Login failed');
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Something went wrong');
        this.loading = false;
      }
    });
  }
}
