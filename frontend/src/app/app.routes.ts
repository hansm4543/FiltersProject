import { Routes } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {AddFilterComponent} from './addFilter/addFilter.component';

export const routes: Routes = [{
    path: "",
    component: HomeComponent,
    title: "Home Page"
},
{
    path: "addFilters",
    component: AddFilterComponent,
    title: "Add Filters page"
// },
// {
//     path: "add/:id",
//     component: SecondComponent,
//     title: "Add Filters page"
// 
}];
