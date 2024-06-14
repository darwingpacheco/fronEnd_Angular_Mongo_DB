import { Routes } from '@angular/router';

import { ReservaFormComponentComponent } from './reserva-form.component/reserva-form.component';
import { ChoferFormComponent } from './Components/chofer-form/chofer-form.component';
import { ChoferListComponent } from './Components/componentChofer/chofer-list/chofer-list.component';
import { RutasFormComponent } from './rutas-form/rutas-form.component';
import { ReservaListComponentComponent } from './reserva-list.component/reserva-list.component.component';

export const routes: Routes = [
    {
        path: 'chofer',
        component: ChoferListComponent
    },
    {
        path: 'chofer-form',
        component: ChoferFormComponent
    },
    { 
        path: 'listaChofer/:id', 
        component: ChoferFormComponent 
    },
    { 
        path: 'reservas', 
        component: ReservaFormComponentComponent 
    },
    { 
        path: 'precios', 
        component: RutasFormComponent 
    },
    {
        path: 'listaReservas',
        component: ReservaListComponentComponent
    }
];
