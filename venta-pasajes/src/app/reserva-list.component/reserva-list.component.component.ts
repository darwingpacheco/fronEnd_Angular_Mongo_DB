import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Reserva } from '../Chofer/reserva.model';
import { ChoferService } from '../Service/chofer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserva-list.component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reserva-list.component.component.html',
  styleUrl: './reserva-list.component.component.css'
})
export class ReservaListComponentComponent {
  reservas: Reserva[] = [];

  constructor(private reservaService: ChoferService, private router: Router) {}

  ngOnInit(): void {
    this.getReservas();
  }

  getReservas(): void {
    this.reservaService.getAllReservas().subscribe((data: Reserva[]) => {
      this.reservas = data;
    });
  }

  editChofer(id: string): void {
    this.router.navigate([`/listaChofer/${id}`]);
  }

  addChofer(): void {
    this.router.navigate(['/listaChofer']);
  }
}
