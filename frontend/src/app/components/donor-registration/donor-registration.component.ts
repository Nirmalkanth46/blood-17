import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-donor-registration',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, HttpClientModule],
  templateUrl: './donor-registration.component.html',
})
export class DonorRegistrationComponent {
  donor = {
    name: '',
    age: null,
    bloodGroup: '',
    phone: '',
    email: '',
    location: '',
    lastDonationDate: '',
  };

  message = '';
  isError = false;

  constructor(private api: ApiService) {}

  registerDonor() {
    console.log('Submitting donor:', this.donor);

    // Validation
    if (
      !this.donor.name ||
      !this.donor.age ||
      !this.donor.bloodGroup ||
      !this.donor.phone ||
      !this.donor.location
    ) {
      this.message = 'Please fill all required fields';
      this.isError = true;
      return;
    }

    // Phone validation
    if (this.donor.phone.length !== 10) {
      this.message = 'Phone number must be 10 digits';
      this.isError = true;
      return;
    }

    // Age validation
    if (this.donor.age < 18 || this.donor.age > 65) {
      this.message = 'Age must be between 18 and 65';
      this.isError = true;
      return;
    }

    this.api.addDonor(this.donor).subscribe({
      next: (response: any) => {
        console.log('Success:', response);
        this.message = '✅ Donor registered successfully!';
        this.isError = false;

        // Reset form
        this.donor = {
          name: '',
          age: null,
          bloodGroup: '',
          phone: '',
          email: '',
          location: '',
          lastDonationDate: '',
        };

        // Auto hide message after 3 seconds
        setTimeout(() => (this.message = ''), 3000);
      },
      error: (err) => {
        console.error('Error details:', err);
        this.message = '❌ Error registering donor. Please try again.';
        this.isError = true;
        setTimeout(() => (this.message = ''), 3000);
      },
    });
  }
}
