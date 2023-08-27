import { Component, Input } from '@angular/core';
import { Food } from 'src/app/core/models/food';

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.css']
})
export class FoodCardComponent {

  @Input({ required: true }) food = new Food()
}
