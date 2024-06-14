import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Routes, provideRouter } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ChoferService } from './app/Service/chofer.service';
import { importProvidersFrom } from '@angular/core';
import { ChoferListComponent } from './app/Components/componentChofer/chofer-list/chofer-list.component';
import { ChoferFormComponent } from './app/Components/chofer-form/chofer-form.component';
import { ReservaFormComponentComponent } from './app/reserva-form.component/reserva-form.component';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  const routes: Routes = [
    { path: 'chofer', component: ChoferListComponent },
    { path: 'listaChofer', component: ChoferFormComponent},
    { path: '', redirectTo: '/chofer', pathMatch: 'full' },
    { path: 'listaChofer/:id', component: ChoferFormComponent},
    { path: 'reservas', component: ReservaFormComponentComponent}
  ];

  bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes),
      importProvidersFrom(HttpClientModule, ReactiveFormsModule),
      ChoferService,
  
    ]
  }).catch(err => console.error(err));