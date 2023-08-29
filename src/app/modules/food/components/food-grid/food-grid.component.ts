import { Component, OnInit, inject } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { Food } from 'src/app/core/models/food';
import { HttpErrorResponse } from '@angular/common/http';
import { Category } from 'src/app/core/models/category';
import { Ingredient } from 'src/app/core/models/ingredient';
import { SpinnerAbstraction } from 'src/app/core/abstractions/spinner.abstraction';

@Component({
  selector: 'app-food-grid',
  templateUrl: './food-grid.component.html',
  styleUrls: ['./food-grid.component.css']
})
export class FoodGridComponent extends SpinnerAbstraction implements OnInit {

  foodService: FoodService = inject(FoodService)

  randomFood !: Food
  foods !: Array<Food>
  categories !: Array<Category>
  areas !: Array<any>
  ingredients !: Array<Ingredient>

  constructor() {
    super()
    this.randomFood = new Food()
    this.foods = new Array<Food>()
    this.categories = new Array<Category>()
    this.areas = new Array<any>()
    this.ingredients = new Array<Ingredient>()
  }

  ngOnInit(): void {
    this.spinner.show()

    this.getRandomFood()
    this.getFoodsByFirstLetter()
    this.getCategories()
    this.getAreas()
    this.getIngredients()

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  getRandomFood() {
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
  }

  getFoodsByFirstLetter() {
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

  getCategories() {
    this.foodService.getFirstTenCategories().subscribe({
      next: (categories: Array<Category>) => {
        console.log(categories)
        this.categories = categories
      },
      error: (error: HttpErrorResponse) => {
        console.error(`Sucedió un error: ${error.message}`)
      },
      complete: () => {
        console.log("Cerrar spinner")
      }
    })
  }

  getAreas() {
    this.foodService.getFirstTenAreas().subscribe({
      next: (areas: any) => {
        console.log(areas)
        this.areas = areas
      },
      error: (error: HttpErrorResponse) => {
        console.error(`Sucedió un error: ${error.message}`)
      },
      complete: () => {
        console.log("Cerrar spinner")
      }
    })
  }

  getIngredients() {
    this.foodService.getFirstTenIngredients().subscribe({
      next: (ingredients: Array<Ingredient>) => {
        console.log(ingredients)
        this.ingredients = ingredients
      },
      error: (error: HttpErrorResponse) => {
        console.error(`Sucedió un error: ${error.message}`)
      },
      complete: () => {
        console.log("Cerrar spinner")
      }
    })
  }

  filterFoodsByCategory(category: String) {
    this.spinner.show()
    this.foodService.findByCategory(category).subscribe({
      next: (foods: Array<Food>) => {
        this.foods = foods
      },
      error: (error: HttpErrorResponse) => {
        console.error(`Sucedió un error: ${error.message}`)
        this.closeSpinnerWithDelay()
      },
      complete: () => {
        this.closeSpinnerWithDelay()
      }
    })
  }

  filterFoodsByArea(area: String) {
    this.spinner.show()
    this.foodService.findByArea(area).subscribe({
      next: (foods: Array<Food>) => {
        this.foods = foods
      },
      error: (error: HttpErrorResponse) => {
        console.error(`Sucedió un error: ${error.message}`)
        this.closeSpinnerWithDelay()
      },
      complete: () => {
        this.closeSpinnerWithDelay()
      }
    })
  }

  filterFoodsByIngredient(ingredient: String) {
    this.spinner.show()
    this.foodService.findByMainIngredient(ingredient).subscribe({
      next: (foods: Array<Food>) => {
        this.foods = foods
      },
      error: (error: HttpErrorResponse) => {
        console.error(`Sucedió un error: ${error.message}`)
        this.closeSpinnerWithDelay()
      },
      complete: () => {
        this.closeSpinnerWithDelay()
      }
    })
  }

}
