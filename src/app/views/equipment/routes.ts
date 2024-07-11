import {Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import("./component/layout/equipment.component").then(c => c.EquipmentComponent)
  }
]
