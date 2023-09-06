import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodGridComponent } from './components/food-grid/food-grid.component';
import { FoodDetailComponent } from './components/food-detail/food-detail.component';
import { FoodComponent } from './food.component';
import { authGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    component: FoodComponent,
    children: [
      {
        path: "",
        component: FoodGridComponent,
        canActivate: [authGuard]
      },
      {
        path: ":id",
        component: FoodDetailComponent,
        canActivate: [authGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodRoutingModule { }
