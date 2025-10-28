import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttenderService } from '../services/attender.service';
import { CommonModule } from '@angular/common';

@Component({
  imports:[CommonModule],
  selector: 'app-view-attender-profile',
  templateUrl: './view-attender-profile.component.html',
  styleUrls: ['./view-attender-profile.component.css']
})
export class ViewAttenderProfileComponent implements OnInit {

  profile: any = null;
  error: string | null = null;
  loading = true;

  constructor(private router: Router, private attenderService: AttenderService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  truthyInt(v: any): boolean {
    return Number(v) === 1;
  }

  loadProfile() {
    this.attenderService.getSelfProfile().subscribe({
      next: (data) => {
        this.profile = data;
        if (!data) this.error = 'Failed to load profile';
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load profile';
        this.loading = false;
      }
    });
  }

  updateProfile() {
    this.router.navigate(['/updateprofile']);
  }
}
