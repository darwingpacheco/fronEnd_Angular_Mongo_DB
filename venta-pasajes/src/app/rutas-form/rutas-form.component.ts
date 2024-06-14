import { Component } from '@angular/core';
import { Precio } from '../Chofer/precio.model';
import { ChoferService } from '../Service/chofer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rutas-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RutasFormComponent],
  templateUrl: './rutas-form.component.html',
  styleUrl: './rutas-form.component.css'
})
export class RutasFormComponent {
  rutas: Precio[] = [];
  newRuta: Precio = new Precio();

  constructor(private precioService: ChoferService) {}

  ngOnInit(): void {
    this.loadRutas();
  }

  loadRutas(): void {
    this.precioService.getAllPrecios().subscribe(data => {
      this.rutas = data;
    });
  }

  onSubmit(): void {
    if (this.newRuta.ciudadOrigen && this.newRuta.ciudadDestino && this.newRuta.precio) {
      this.precioService.createPrecios(this.newRuta).subscribe(() => {
        this.loadRutas();
        this.newRuta = new Precio(); // Reset form
      });
    }
  }

  updatePrecios(ruta: Precio): void {
    // Lógica para editar una ruta existente
  }

  deleteRuta(id: string): void {
    this.precioService.deletePrecios(id).subscribe(() => {
      this.loadRutas();
    });
  }

}
