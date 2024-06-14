import { Routes } from '@angular/router';

import { ReservaFormComponentComponent } from './reserva-form.component/reserva-form.component';
import { ChoferFormComponent } from './Components/chofer-form/chofer-form.component';
import { ChoferListComponent } from './Components/componentChofer/chofer-list/chofer-list.component';

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
    }
];
