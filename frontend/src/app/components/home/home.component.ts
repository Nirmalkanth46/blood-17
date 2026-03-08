import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // Make sure this is imported

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink], // RouterLink in imports
  templateUrl: './home.component.html',
})
export class HomeComponent {}
