import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodGridComponent } from './components/food-grid/food-grid.component';
import { FoodDetailComponent } from './components/food-detail/food-detail.component';
import { FoodComponent } from './food.component';

const routes: Routes = [
  {
    path: "",
    component: FoodComponent,
    children: [
      {
        path: "",
        component: FoodGridComponent
      },
      {
        path: ":id",
        component: FoodDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodRoutingModule { }
