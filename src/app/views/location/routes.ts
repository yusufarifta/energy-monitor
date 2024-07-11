import {Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/default/location.component').then(c => c.LocationComponent),
  },
  {
    path: ":id",
    children: [
      {
        path: "",
        loadComponent: () => import('./pages/location-detail/location-detail.component').then(c => c.LocationDetailComponent),
      },
      {
        path: "power/:id2",
        loadComponent: () => import('./pages/power-detail/power-detail.component').then(c => c.PowerDetailComponent)
      }
    ]
  },
]
