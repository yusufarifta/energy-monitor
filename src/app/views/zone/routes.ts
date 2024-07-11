import {Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import("./component/layout/zone.component").then(c => c.ZoneComponent)
  }
]
