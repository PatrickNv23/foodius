import { Component, OnInit, inject } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { Food } from 'src/app/core/models/food';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-food-grid',
  templateUrl: './food-grid.component.html',
  styleUrls: ['./food-grid.component.css']
})
export class FoodGridComponent implements OnInit {

  foodService: FoodService = inject(FoodService)
  randomFood !: Food
  foods !: Array<Food>

  constructor() {
    this.randomFood = new Food()
    this.foods = new Array<Food>()
  }

  ngOnInit(): void {
    this.foodService.getRandomFood().subscribe({
      next: (result: Food) => {
        this.randomFood = result
      },
      error: (error: HttpErrorResponse) => {
        console.error(`Sucedió un error: ${error.message}`)
      },
      complete: () => {
        console.log("Cerrar spinner")
      }
    })

    this.foodService.getFoodsByFirstLetter().subscribe({
      next: (result: Array<Food>) => {
        this.foods = result
      },
      error: (error: HttpErrorResponse) => {
        console.error(`Sucedió un error: ${error.message}`)
      },
      complete: () => {
        console.log("Cerrar spinner")
      }
    })
  }
}
