import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'foods',
    pathMatch: 'full'
  },
  {
    path: 'foods',
    loadChildren: () => import('./modules/food/food-routing.module').then((module) => module.FoodRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
