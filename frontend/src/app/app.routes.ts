import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/donor-registration/donor-registration.component').then(
        (m) => m.DonorRegistrationComponent,
      ),
  },
  {
    path: 'donors',
    loadComponent: () =>
      import('./components/donor-list/donor-list.component').then((m) => m.DonorListComponent),
  },
  {
    path: 'request',
    loadComponent: () =>
      import('./components/blood-request/blood-request.component').then(
        (m) => m.BloodRequestComponent,
      ),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./components/admin-dashboard/admin-dashboard.component').then(
        (m) => m.AdminDashboardComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
