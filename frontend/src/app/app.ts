import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-danger">
      <div class="container">
        <a class="navbar-brand" routerLink="/">🩸 AI Blood Donation</a>
        <div class="navbar-nav">
          <!-- Remove routerLinkActiveOptions completely -->
          <a class="nav-link" routerLink="/">Home</a>
          <a class="nav-link" routerLink="/register">Register</a>
          <a class="nav-link" routerLink="/donors">Donors</a>
          <a class="nav-link" routerLink="/request">Request Blood</a>
          <a class="nav-link" routerLink="/admin">Admin</a>
        </div>
      </div>
    </nav>
    <div class="container mt-3">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class App {
  title = 'Blood Donation AI';
}
