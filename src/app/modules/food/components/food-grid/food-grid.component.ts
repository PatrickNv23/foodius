import { Component, OnDestroy, OnInit, TrackByFunction, inject } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { Food } from 'src/app/core/models/food';
import { HttpErrorResponse } from '@angular/common/http';
import { Category } from 'src/app/core/models/category';
import { Ingredient } from 'src/app/core/models/ingredient';
import { UtilsAbstraction } from 'src/app/core/abstractions/utils.abstraction';
import { MAX_WORDS } from 'src/app/core/constants/constanst';
import { initFlowbite } from 'flowbite';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-food-grid',
  templateUrl: './food-grid.component.html',
  styleUrls: ['./food-grid.component.css']
})
export class FoodGridComponent extends UtilsAbstraction implements OnInit, OnDestroy {

  private foodService: FoodService = inject(FoodService)
  private subscriptions!: Subscription

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
    this.subscriptions = new Subscription()
  }

  ngOnInit(): void {
    initFlowbite()
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
    let subscription = this.foodService.getRandomFood().subscribe({
      next: (result: Food) => {
        this.randomFood = result
        this.randomFood.instructions = result.instructions.substring(0, MAX_WORDS)
      },
      error: (error: HttpErrorResponse) => {
        this.showErrorAlert(error.message)
      },
      complete: () => { }
    })
    this.subscriptions.add(subscription)
  }

  getFoodsByFirstLetter() {
    let subscription = this.foodService.getFoodsByFirstLetter().subscribe({
      next: (result: Array<Food>) => {
        this.foods = result
      },
      error: (error: HttpErrorResponse) => {
        this.showErrorAlert(error.message)
      },
      complete: () => { }
    })

    this.subscriptions.add(subscription)
  }

  getCategories() {
    let subscription = this.foodService.getCategories().subscribe({
      next: (categories: Array<Category>) => {
        console.log(categories)
        this.categories = categories
      },
      error: (error: HttpErrorResponse) => {
        this.showErrorAlert(error.message)
      },
      complete: () => { }
    })
    this.subscriptions.add(subscription)
  }

  getAreas() {
    let subscription = this.foodService.getFirstTenAreas().subscribe({
      next: (areas: any) => {
        console.log(areas)
        this.areas = areas
      },
      error: (error: HttpErrorResponse) => {
        this.showErrorAlert(error.message)
      },
      complete: () => { }
    })
    this.subscriptions.add(subscription)
  }

  getIngredients() {
    let subscription = this.foodService.getFirstTenIngredients().subscribe({
      next: (ingredients: Array<Ingredient>) => {
        console.log(ingredients)
        this.ingredients = ingredients
      },
      error: (error: HttpErrorResponse) => {
        this.showErrorAlert(error.message)
      },
      complete: () => { }
    })
    this.subscriptions.add(subscription)
  }

  filterFoodsByCategory(category: String) {
    this.spinner.show()
    let subscription = this.foodService.findByCategory(category).subscribe({
      next: (foods: Array<Food>) => {
        this.foods = foods
      },
      error: (error: HttpErrorResponse) => {
        this.closeSpinnerWithDelay()
        this.showErrorAlertWithDelay(error.message)
      },
      complete: () => {
        this.closeSpinnerWithDelay()
      }
    })
    this.subscriptions.add(subscription)
  }

  filterFoodsByArea(area: String) {
    this.spinner.show()
    let subscription = this.foodService.findByArea(area).subscribe({
      next: (foods: Array<Food>) => {
        this.foods = foods
      },
      error: (error: HttpErrorResponse) => {
        this.closeSpinnerWithDelay()
        this.showErrorAlertWithDelay(error.message)
      },
      complete: () => {
        this.closeSpinnerWithDelay()
      }
    })
    this.subscriptions.add(subscription)
  }

  filterFoodsByIngredient(ingredient: String) {
    this.spinner.show()
    let subscription = this.foodService.findByMainIngredient(ingredient).subscribe({
      next: (foods: Array<Food>) => {
        this.foods = foods
      },
      error: (error: HttpErrorResponse) => {
        this.closeSpinnerWithDelay()
        this.showErrorAlertWithDelay(error.message)
      },
      complete: () => {
        this.closeSpinnerWithDelay()
      }
    })
    this.subscriptions.add(subscription)
  }

  getFoodsByName(name: String) {

    this.spinner.show()

    if (name !== "") {
      let subscription = this.foodService.getFoodsByName(name).subscribe({
        next: (foods: Array<Food>) => {
          this.foods = foods
        },
        error: (error: HttpErrorResponse) => {
          this.closeSpinnerWithDelay()
          this.showErrorAlertWithDelay(error.message)
        },
        complete: () => {
          this.closeSpinnerWithDelay()
        }
      })
      this.subscriptions.add(subscription)
    } else {
      this.closeSpinnerWithDelay()
      this.showErrorAlertWithDelay()
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  trackByIngredientId: TrackByFunction<Ingredient>
    = (index: number, ingredient: Ingredient) => ingredient.id

  trackByFoodId: TrackByFunction<Food> = (index: number, food: Food) => food.id
}
