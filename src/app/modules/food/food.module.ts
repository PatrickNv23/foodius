import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodRoutingModule } from './food-routing.module';
import { FoodDetailComponent } from './components/food-detail/food-detail.component';
import { FoodCardComponent } from './components/food-card/food-card.component';
import { FoodGridComponent } from './components/food-grid/food-grid.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FoodComponent } from './food.component'
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FoodDetailComponent,
    FoodCardComponent,
    FoodGridComponent,
    FoodComponent,
  ],
  imports: [
    CommonModule,
    FoodRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    SharedModule
  ]
})
export class FoodModule { }
