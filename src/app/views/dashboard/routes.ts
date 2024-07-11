import { Routes } from '@angular/router';
import {AuthGuard} from "../../services/system/auth.guard";

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent),
    data: {
      title: $localize`Dashboard`
    }
  }
];

