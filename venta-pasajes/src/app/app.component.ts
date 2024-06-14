import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ChoferListComponent } from './Components/componentChofer/chofer-list/chofer-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ChoferListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'venta-pasajes';
}
