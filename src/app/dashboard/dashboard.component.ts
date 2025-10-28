import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { AttenderService } from '../services/attender.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface Devotee {
  appointment: string;
  appointment_type: string;
  primary_devoteee_name: string;
  appointment_date: string;
  group_size: number;
  notes?: string;
  mark_exit?: string; // ✅ add this

}

interface Companion {
  gender: string;
  age?: string;
  name?: string;
  phone?:string;
}

interface DevoteeDetails {
  appointment: string;
  primary: string;
  groupSize: number;
  notes: string;
  type: string;
  date: string;
  mark_exit?: string;
  start_time?: string;
  end_time?: string;
  companions?: Companion[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
user = { name: '', id: '' };

  // Svelte-style variables
  marked_exit_schedules = 0;
  total_schedules = 0;
  devotees: Devotee[] = [];

  showModal = false;
  current: DevoteeDetails | null = null;

  todayLabel = formatDate(new Date(), 'EEEE, MMMM d, y', 'en-US');

  constructor(
    private attenderService: AttenderService,
    private toastr: ToastrService,

  ) {}

  ngOnInit(): void {
    this.loadUserProfile();  // 👈 add this
    this.loadAppointments();
    this.loadStats();
  }

async loadAppointments() {
  try {
    const data: any = await this.attenderService.getAttenderAppointmentsList(null).toPromise();
    if (data?.message) {
      this.devotees = data.message.map((d: any) => ({
        ...d,
        mark_exit: d.mark_exit === 1 ? 'Yes' : 'No' // normalize for UI
      }));

      // Update stats immediately
      this.total_schedules = this.devotees.length;
      this.marked_exit_schedules = this.devotees.filter(d => d.mark_exit === 'Yes').length;
    }
  } catch (err) {
    console.error('Error loading appointments:', err);
  }
}


  async loadStats() {
    try {
      const data: any = await this.attenderService.getAppointmentStats().toPromise();
      if (data?.message) {
        this.total_schedules = data.message.total_schedules;
        this.marked_exit_schedules = data.message.marked_exit_schedules;
      }
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  }

  get activeAssigned(): number {
    return this.total_schedules - this.marked_exit_schedules;
  }
async openDetails(dev: any) {
  // Initialize modal immediately
  this.current = {
    appointment: dev.appointment,
    primary: dev.primary_devoteee_name,
    groupSize: dev.group_size,
    notes: 'Loading details...',
    type: dev.appointment_type,
    date: dev.appointment_date,
    mark_exit: dev.mark_exit === 1 || dev.mark_exit === 'Yes' ? 'Yes' : 'No',
    start_time: dev.slot_start_time || '',
    end_time: dev.slot_end_time || '',
    companions: []
  };

  this.showModal = true;

  try {
    const res: any = await this.attenderService
      .getAppointmentDetails(dev.appointment)
      .toPromise();

    if (res?.message) {
      const d = res.message;

      this.current = {
        appointment: d.name || dev.appointment,
        primary: d.primary_devoteee_name || dev.primary_devoteee_name,
        groupSize: d.group_size || dev.group_size,
        notes: d.notes || 'No additional notes.',
        type: d.appointment_type || dev.appointment_type,
        date: d.appointment_date || dev.appointment_date,

        // ✅ Always fallback to dev.mark_exit
        mark_exit:
          d.mark_exit === 1
            ? 'Yes'
            : d.mark_exit === 0
            ? 'No'
            : dev.mark_exit === 1 || dev.mark_exit === 'Yes'
            ? 'Yes'
            : 'No',

        start_time: d.slot_start_time || 'N/A',
        end_time: d.slot_end_time || 'N/A',
        companions: Array.isArray(d.darshan_companion)
          ? d.darshan_companion.map((c: any) => ({
              name: c.companion_name,
              gender: c.companion_gender,
              age: c.companion_age || 'N/A',
              phone:c.companion_phone || 'N/A'
            }))
          : []
      };
    } else {
      this.current.notes = 'No details found.';
    }
  } catch (err) {
    console.error('Error fetching appointment details:', err);
    this.current.notes = 'Error fetching details.';
  }
}







  closeModal() {
    this.showModal = false;
    this.current = null;
  }
markExit(appointmentId: string) {
  this.attenderService.markExit(appointmentId).subscribe({
    next: (res) => {
      if (res?.message?.mark_exit === 1) {
        // Update local
        const devotee = this.devotees.find(d => d.appointment === appointmentId);
        if (devotee) devotee.mark_exit = 'Yes';

        // Update modal
        if (this.current?.appointment === appointmentId) {
          this.current.mark_exit = 'Yes';
        }

        // Recalculate counts
        this.marked_exit_schedules = this.devotees.filter(d => d.mark_exit === 'Yes').length;

        // Optional: Refresh list from server for latest state
        // this.loadAppointments();

        // ✅ Show toastr instead of alert
        this.toastr.success('Exit marked successfully!', 'Success ✅');
      } else {
        this.toastr.warning('Could not mark exit. Please try again.', 'Warning ⚠️');
      }
    },
    error: (err) => {
      console.error('Error marking exit:', err);
      alert('An error occurred while marking exit.');
    }
  });
}

  logout() {
    
    this.attenderService.logoutUser();
  }

async loadUserProfile() {
  try {
    const profile = await this.attenderService.getSelfProfile().toPromise();
    console.log('Loaded profile:', profile); // ✅ Debug line

    if (profile) {
      this.user = {
        name: profile.attender_name || 'Unknown User',
        id: profile.name || 'N/A'
      };
    } else {
      console.warn('No profile data found.');
    }
  } catch (err) {
    console.error('Error loading user profile:', err);
  }
}


}






