import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/standalone/notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth-routing.module').then((module) => module.AuthRoutingModule)
  },
  {
    path: 'foods',
    loadChildren: () => import('./modules/food/food-routing.module').then((module) => module.FoodRoutingModule)
  },
  {
    path: '**',
    loadComponent: () => import('./shared/standalone/notfound/notfound.component').then((component) => component.NotFoundComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
