import { Component, OnInit } from '@angular/core';
import { Chofer } from '../../../Chofer/chofer.model';
import { ChoferService } from '../../../Service/chofer.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chofer-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chofer-list.component.html',
  styleUrl: './chofer-list.component.css'
})

export class ChoferListComponent implements OnInit {
  choferes: Chofer[] = [];

  constructor(private choferService: ChoferService, private router: Router) {}

  ngOnInit(): void {
    this.getChoferes();
  }

  getChoferes(): void {
    this.choferService.getAllChoferes().subscribe((data: Chofer[]) => {
      this.choferes = data;
    });
  }

  deleteChofer(id: string): void {
    this.choferService.deleteChofer(id).subscribe(() => {
      this.getChoferes(); // Refresh the list after deletion
    });
  }

  editChofer(id: string): void {
    this.router.navigate([`/listaChofer/${id}`]);
  }

  addChofer(): void {
    this.router.navigate(['/listaChofer']);
  }
}
