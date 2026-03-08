import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink], // Keep RouterLink for navigation
  template: `
    <div class="container">
      <h2>Admin Dashboard</h2>
      <p>Manage donors and requests</p>
      <button class="btn btn-primary" routerLink="/">Back to Home</button>
    </div>
  `,
})
export class AdminDashboardComponent {}
