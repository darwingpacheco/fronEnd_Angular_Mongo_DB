import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChoferService } from '../../Service/chofer.service';
import { Chofer } from '../../Chofer/chofer.model';

@Component({
  selector: 'app-chofer-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ChoferFormComponent],
  template: `
    <div>
      <h2>{{ isEdit ? 'Editar' : 'Agregar' }} Chofer</h2>
      <form (ngSubmit)="onSubmit()" #choferForm="ngForm">
        <div>
          <label for="nombreChofer">Nombre:</label>
          <input type="text" id="nombreChofer" [(ngModel)]="chofer.nombreChofer" name="nombreChofer" required>
        </div>
        <div>
          <label for="cedulaChofer">Cédula:</label>
          <input type="text" id="cedulaChofer" [(ngModel)]="chofer.cedulaChofer" name="cedulaChofer" required>
        </div>
        <div>
          <label for="placaVehiculo">Placa del Vehículo:</label>
          <input type="text" id="placaVehiculo" [(ngModel)]="chofer.placaVehiculo" name="placaVehiculo" required>
        </div>
        <div>
          <label for="numeroVehiculo">Número del Vehículo:</label>
          <input type="text" id="numeroVehiculo" [(ngModel)]="chofer.numeroVehiculo" name="numeroVehiculo" required>
        </div>
        <button type="submit">{{ isEdit ? 'Actualizar' : 'Agregar' }}</button>
      </form>
    </div>
  `,
  styleUrls: ['./chofer-form.component.css']
})

export class ChoferFormComponent implements OnInit {
  chofer: Chofer = new Chofer();
  isEdit = false;

  constructor(
    private choferService: ChoferService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.choferService.getChoferById(id).subscribe((chofer) => {
        this.chofer = chofer;
      });
    }
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.choferService.updateChofer(this.chofer).subscribe(() => {
        this.router.navigate(['/chofer']);
      });
    } else {
      this.choferService.createChofer(this.chofer).subscribe(() => {
        this.router.navigate(['/chofer']);
      });
    }
  }
}
