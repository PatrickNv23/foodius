import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../services/food.service';
import { Food } from 'src/app/core/models/food';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilsAbstraction } from 'src/app/core/abstractions/utils.abstraction';
import { Category } from 'src/app/core/models/category';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent extends UtilsAbstraction implements OnInit {

  activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  foodService: FoodService = inject(FoodService)

  foodId !: String
  food !: Food
  category !: Category

  constructor() {
    super()
    this.food = new Food()
    this.category = new Category()
  }

  ngOnInit(): void {

    this.spinner.show()

    this.foodId = this.activatedRoute.snapshot.paramMap.get('id') as String
    this.foodService.getFoodById(this.foodId).subscribe({
      next: (result: Food) => {
        this.food = result
      },
      error: (error: HttpErrorResponse) => {
        this.closeSpinnerWithDelay()
        this.showErrorAlertWithDelay(error.message)
      },
      complete: () => {
        this.closeSpinnerWithDelay()
      }
    })
  }

  getCategoryDetails(categoryName: String) {
    this.foodService.getCategories().subscribe({
      next: (categories: Array<Category>) => {
        let categoryFound = categories.find((category) => category.title === categoryName)
        categoryFound ?? alert("hola")
        categoryFound && console.log(categoryFound)
      },
      error: (error: HttpErrorResponse) => {
        this.closeSpinnerWithDelay()
        this.showErrorAlertWithDelay(error.message)
      },
      complete: () => {
        this.closeSpinnerWithDelay()
      }
    })
  }
}
