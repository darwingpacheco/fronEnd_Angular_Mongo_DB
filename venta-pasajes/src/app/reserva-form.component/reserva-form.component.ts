import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Reserva } from '../Chofer/reserva.model';
import { ChoferService } from '../Service/chofer.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  ciudades: string[] = ['Abrego', 'Ocaña', 'Cucuta', 'Bucaramanga']; // Lista de ciudades
  ciudadesDestino: string[] = this.ciudades.slice(); // Lista de ciudades de destino disponibles
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
      this.reservaService.getReservaById(id).subscribe((reserva) => {
        this.reserva = reserva;
        this.updateCiudadesDestino(); // Filtrar ciudades destino si es edición
      });
    }
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
