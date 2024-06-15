import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Reserva } from '../Chofer/reserva.model';
import { Factura } from '../Chofer/factura.model';
import { Precio } from '../Chofer/precio.model';
import { ChoferService } from '../Service/chofer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reserva-form.component',
  standalone: true,
  imports: [CommonModule, FormsModule, ReservaFormComponentComponent],
  templateUrl: './reserva-form.component.html',
  styleUrl: './reserva-form.component.css'
})
export class ReservaFormComponentComponent implements OnInit {

  reserva: Reserva = new Reserva();
  factura: Factura = new Factura();
  precio: Precio = new Precio();
  isEdit = false;
  ciudades: string[] = [];
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
        this.updateCiudadesDestino();
        this.updatePrecio();
      });
    }
    
    this.reservaService.getAllCiudades().subscribe(ciudades => {
      this.ciudades = ciudades;
      this.ciudadesDestino = [...ciudades];
    });
  }

  onOrigenChange(): void {
    this.updateCiudadesDestino();
    this.updatePrecio();
  }

  onDestinoChange(): void {
    this.updatePrecio();
  }

  updateCiudadesDestino(): void {
    this.ciudadesDestino = this.ciudades.filter(ciudad => ciudad !== this.reserva.ciudadOrigen);
  }

  updatePrecio(): void {
    if (this.reserva.ciudadOrigen && this.reserva.ciudadDestino) {
      this.reservaService.getPrecioByRuta(this.reserva.ciudadOrigen, this.reserva.ciudadDestino).subscribe(
        (precio) => {
          this.reserva.precio = precio.precio;
          this.factura.precioUnitario = precio.precio;
          this.updateTotal();
        },
        (error) => {
          if (error.status === 404) {
            console.error('No se encontró precio para la ruta especificada.');
            Swal.fire('Error', 'No se encontró precio para la ruta especificada.', 'error');
            this.precio = new Precio();
            this.factura.precioUnitario = 0;
            this.updateTotal();
          } else {
            console.error('Error al obtener precio:', error);
          }
        }
      );
    } else {
      this.precio = new Precio();
      this.factura.precioUnitario = 0;
      this.updateTotal();
    }
  }
  
  
  updateTotal(): void {
    if (this.reserva.cantidadPuestos !== undefined && this.factura.precioUnitario !== undefined) {
      this.factura.precioTotal = this.factura.precioUnitario * this.reserva.cantidadPuestos;
    }
  }

  isFormValid(): boolean {
    return (
      !!this.reserva.nombrePasajero &&
      !!this.reserva.apellidoPasajero &&
      !!this.reserva.documentoPasajero &&
      !!this.reserva.telefonoPasajero &&
      !!this.reserva.direccionPasajero &&
      !!this.reserva.ciudadOrigen &&
      !!this.reserva.ciudadDestino &&
      this.reserva.cantidadPuestos != null
    );
  }

  realizarOperacion(): void {
      this.updatePrecio(); // Llama al método para actualizar el precio según ciudadOrigen y ciudadDestino
  }
  

  onSubmit(): void {
    this.formSubmitted = true;
  
    if (this.isFormValid()) {
      if (this.isEdit) {
        this.reservaService.updateReserva(this.reserva).subscribe(() => {
          Swal.fire('Éxito', 'Reserva actualizada correctamente', 'success');
          this.router.navigate(['/reservas']);
        });
      } else {
        this.reservaService.createReserva(this.reserva).subscribe(() => {
          Swal.fire('Éxito', 'Reserva creada correctamente', 'success');
          this.reserva = new Reserva(); // Limpiar los campos del formulario
          this.factura = new Factura(); // Limpiar factura si es necesario
          this.precio = new Precio(); // Limpiar precio si es necesario
          this.formSubmitted = false; // Reiniciar el estado de envío del formulario
        });
      }
    } else {
      Swal.fire('Error', 'Por favor complete todos los campos requeridos', 'error');
    }
  }  
}
