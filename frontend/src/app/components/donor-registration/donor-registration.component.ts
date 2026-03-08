import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { INDIAN_CITIES } from '../../services/indian-cities'; // <--- ADD THIS IMPORT

@Component({
  selector: 'app-donor-registration',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, HttpClientModule],
  templateUrl: './donor-registration.component.html',
  // <--- ADD STYLES FOR AUTOCOMPLETE
  styles: [
    `
      .suggestions-dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        max-height: 200px;
        overflow-y: auto;
        background: white;
        border: 1px solid #ddd;
        border-radius: 4px;
        z-index: 1000;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .suggestion-item {
        padding: 8px 12px;
        cursor: pointer;
        transition: background 0.2s;
      }

      .suggestion-item:hover {
        background-color: #f8f9fa;
        color: #dc3545;
      }

      .position-relative {
        position: relative;
      }
    `,
  ],
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
  isError = false; // ✅ This is correct - already here

  // <--- ADD THESE AUTOCOMPLETE PROPERTIES
  filteredCities: string[] = [];
  showSuggestions = false;
  allCities = INDIAN_CITIES;

  constructor(private api: ApiService) {}

  // <--- ADD THESE AUTOCOMPLETE METHODS
  filterCities(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    if (searchTerm.length >= 1) {
      this.filteredCities = this.allCities
        .filter((city) => city.toLowerCase().includes(searchTerm))
        .slice(0, 10);

      this.showSuggestions = this.filteredCities.length > 0;
    } else {
      this.filteredCities = [];
      this.showSuggestions = false;
    }
  }

  onLocationFocus() {
    if (this.donor.location && this.donor.location.length >= 1) {
      this.filterCities({ target: { value: this.donor.location } });
    }
  }

  hideSuggestions() {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }

  selectCity(city: string) {
    this.donor.location = city;
    this.showSuggestions = false;
    this.filteredCities = [];
  }

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
