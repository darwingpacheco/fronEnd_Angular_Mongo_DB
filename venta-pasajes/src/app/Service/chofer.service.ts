import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chofer } from '../Chofer/chofer.model';
import { Reserva } from '../Chofer/reserva.model';


@Injectable({
  providedIn: 'root'
})
export class ChoferService {
  private apiUrl = 'http://localhost:8080/api/chofer';
  private apiUrlReserva = 'http://localhost:8080/api/reservas';

  constructor(private http: HttpClient) {}

  getAllChoferes(): Observable<Chofer[]> {
    return this.http.get<Chofer[]>(this.apiUrl);
  }

  getChoferById(id: string): Observable<Chofer> {
    return this.http.get<Chofer>(`${this.apiUrl}/${id}`);
  }

  createChofer(chofer: Chofer): Observable<Chofer> {
    return this.http.post<Chofer>(this.apiUrl, chofer);
  }

  updateChofer(chofer: Chofer): Observable<Chofer> {
    return this.http.put<Chofer>(`${this.apiUrl}/${chofer.idChofer}`, chofer);
  }

  deleteChofer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  createReserva(reservas: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrlReserva, reservas);
  }

  updateReserva(reservas: Reserva): Observable<Reserva> {
    return this.http.put<Reserva>(`${this.apiUrl}/${reservas.idReserva}`, reservas);
  }

  getReservaById(id: string): Observable<Reserva> {
    return this.http.get<Reserva>(`${this.apiUrl}/${id}`);
  }

}
