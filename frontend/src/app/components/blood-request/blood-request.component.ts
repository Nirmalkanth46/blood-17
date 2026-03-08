import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router'; // Keep RouterLink
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-blood-request',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule], // Keep RouterLink in imports
  templateUrl: './blood-request.component.html',
})
export class BloodRequestComponent {
  request = {
    patientName: '',
    bloodGroup: '',
    hospitalName: '',
    location: '',
    contactNumber: '',
  };

  matchingDonors: any[] = [];

  constructor(private api: ApiService) {}

  submitRequest() {
    this.api.requestBlood(this.request).subscribe({
      next: (donors: any) => {
        this.matchingDonors = donors;
        alert('Blood request submitted! Matching donors found: ' + donors.length);
        this.request = {
          patientName: '',
          bloodGroup: '',
          hospitalName: '',
          location: '',
          contactNumber: '',
        };
      },
      error: (err) => alert('Error submitting request'),
    });
  }
}
