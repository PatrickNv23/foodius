import { Component, ElementRef, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../services/food.service';
import { Food } from 'src/app/core/models/food';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilsAbstraction } from 'src/app/core/abstractions/utils.abstraction';
import { Category } from 'src/app/core/models/category';
import { MAX_WORDS } from 'src/app/core/constants/constanst';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent extends UtilsAbstraction implements OnInit {

  @ViewChild('modal') modal!: ElementRef

  activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  foodService: FoodService = inject(FoodService)
  renderer2Service: Renderer2 = inject(Renderer2)

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
        this.food.instructions = result.instructions.substring(0, MAX_WORDS)
        this.food.category && this.getCategoryDetails(this.food.category)
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
        if (categoryFound) {
          this.category = categoryFound
          console.log(this.category)
        }

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

  showCategoryDetails() {
    this.renderer2Service.removeClass(this.modal.nativeElement, 'hidden')
  }

  closeCategoryDetails() {
    this.renderer2Service.addClass(this.modal.nativeElement, 'hidden')
  }
}
