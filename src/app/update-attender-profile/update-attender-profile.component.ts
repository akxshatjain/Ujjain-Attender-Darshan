import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttenderService } from '../services/attender.service';
import { ToastrService } from 'ngx-toastr'; // optional toast
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  imports:[CommonModule,FormsModule,RouterModule],
  selector: 'app-update-attender-profile',
  templateUrl: './update-attender-profile.component.html',
  styleUrls: ['./update-attender-profile.component.css'],
})
export class UpdateAttenderProfileComponent implements OnInit {
  profileData: any = null;

  name = '';
  gender = '';
  dob = '';
  address = '';
  aadhar = '';

  loading = false;
  submitted = false;

  constructor(
    private attenderService: AttenderService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile() {
    this.attenderService.getSelfProfile().subscribe((data) => {
      if (data) {
        this.profileData = data;
        this.name = data.attender_name || '';
        this.gender = data.gender || '';
        this.dob = data.dob || '';
        this.address = data.address || '';
        this.aadhar = data.aadhar || '';
      }
    });
  }

  resetForm() {
    if (this.profileData) {
      this.name = this.profileData.attender_name || '';
      this.gender = this.profileData.gender || '';
      this.dob = this.profileData.dob || '';
      this.address = this.profileData.address || '';
      this.aadhar = this.profileData.aadhar || '';
    }
  }

  onSubmit() {
    this.loading = true;

    const info = {
      attender_name: this.name.trim(),
      gender: this.gender,
      dob: this.dob,
      address: this.address.trim(),
      aadhar: this.aadhar.trim(),
    };

    this.attenderService.updateProfile(info).subscribe((res) => {
      this.loading = false;
      this.submitted = true;

      if (res?.message) {
        this.toastr.success(res.message);
      } else {
        this.toastr.info('Profile updated successfully.');
      }
    });
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
