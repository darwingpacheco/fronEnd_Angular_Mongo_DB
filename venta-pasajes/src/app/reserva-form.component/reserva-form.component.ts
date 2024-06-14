import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Reserva } from '../Chofer/reserva.model';
import { ChoferService } from '../Service/chofer.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reserva-form.component',
  standalone: true,
  imports: [CommonModule, FormsModule, ReservaFormComponentComponent],
  templateUrl: './reserva-form.component.html',
  styleUrl: './reserva-form.component.css'
})
export class ReservaFormComponentComponent {

  reserva: Reserva = new Reserva();
  isEdit = false;
  ciudades: string[] = []; // Lista de ciudades
  ciudadesDestino: string[] = [];
  formSubmitted = false;

  constructor(
    private reservaService: ChoferService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.reservaService.getReservaById(id).subscribe(reserva => {
        this.reserva = reserva;
        this.updateCiudadesDestino(); // Filtrar ciudades destino si es edición
      });
    }
    
    this.reservaService.getAllCiudades().subscribe(ciudades => {
      this.ciudades = ciudades;
      this.ciudadesDestino = [...ciudades]; // Inicialmente, las ciudades destino son todas las ciudades
    });
  }

  onOrigenChange(): void {
    this.updateCiudadesDestino();
  }

  updateCiudadesDestino(): void {
    this.ciudadesDestino = this.ciudades.filter(ciudad => ciudad !== this.reserva.ciudadOrigen);
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.isEdit) {
      this.reservaService.updateReserva(this.reserva).subscribe(() => {
        this.router.navigate(['/reservas']);
      });
    } else {
      this.reservaService.createReserva(this.reserva).subscribe(() => {
        this.router.navigate(['/reservas']);
      });
    }
  }
}
