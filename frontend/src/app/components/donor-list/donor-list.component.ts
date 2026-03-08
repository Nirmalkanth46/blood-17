import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-donor-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './donor-list.component.html',
  styles: [
    `
      .badge {
        font-size: 14px;
        padding: 5px 10px;
      }
      .table th {
        background-color: #f8f9fa;
      }
    `,
  ],
})
export class DonorListComponent implements OnInit {
  donors: any[] = [];
  loading = false;
  message = '';

  constructor(private api: ApiService) {
    console.log('DonorListComponent initialized');
  }

  ngOnInit() {
    console.log('DonorListComponent ngOnInit called');
    this.loadDonors();
  }

  loadDonors() {
    console.log('Loading donors...');
    this.loading = true;
    this.message = '';

    this.api.getDonors().subscribe({
      next: (data: any) => {
        console.log('Donors received from API:', data);
        console.log('Number of donors:', data?.length);
        console.log('Donors data type:', typeof data);
        console.log('Is array?', Array.isArray(data));

        // Handle different response formats
        if (data) {
          if (Array.isArray(data)) {
            this.donors = data;
          } else if (data.data && Array.isArray(data.data)) {
            this.donors = data.data;
          } else if (data.content && Array.isArray(data.content)) {
            this.donors = data.content;
          } else {
            console.warn('Unexpected data format:', data);
            this.donors = [];
          }
        } else {
          this.donors = [];
        }

        console.log('Processed donors array:', this.donors);

        if (this.donors.length === 0) {
          this.message = 'No donors found';
        } else {
          this.message = '';
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading donors:', err);
        this.message = 'Error loading donors. Make sure backend is running on port 8081';
        this.loading = false;
        this.donors = [];
      },
      complete: () => {
        console.log('Donor loading completed');
      },
    });
  }

  deleteDonor(id: string) {
    if (confirm('Are you sure you want to delete this donor?')) {
      console.log('Deleting donor with id:', id);

      this.api.deleteDonor(id).subscribe({
        next: () => {
          console.log('Donor deleted successfully');
          this.message = 'Donor deleted successfully';
          this.loadDonors(); // Refresh list
          setTimeout(() => (this.message = ''), 3000);
        },
        error: (err) => {
          console.error('Error deleting donor:', err);
          this.message = 'Error deleting donor';
          setTimeout(() => (this.message = ''), 3000);
        },
      });
    }
  }

  formatDate(date: string) {
    if (!date) return 'N/A';
    try {
      const d = new Date(date);
      return d.toLocaleDateString();
    } catch (e) {
      return date;
    }
  }
}
