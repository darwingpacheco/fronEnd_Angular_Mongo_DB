import { Routes } from '@angular/router';
import { ChoferListComponent } from './Components/componentChofer/chofer-list/chofer-list.component';
import { ChoferFormComponent } from './Components/chofer-form/chofer-form.component';

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
];
