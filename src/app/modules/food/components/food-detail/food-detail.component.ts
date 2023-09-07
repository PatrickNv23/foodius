import { Component, ElementRef, OnDestroy, OnInit, Renderer2, TrackByFunction, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../services/food.service';
import { Food } from 'src/app/core/models/food';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilsAbstraction } from 'src/app/core/abstractions/utils.abstraction';
import { Category } from 'src/app/core/models/category';
import { MAX_WORDS } from 'src/app/core/constants/constanst';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/core/models/ingredient';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent extends UtilsAbstraction implements OnInit, OnDestroy {

  @ViewChild('modal') modal!: ElementRef

  activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  foodService: FoodService = inject(FoodService)
  renderer2Service: Renderer2 = inject(Renderer2)

  private subscriptions !: Subscription

  foodId !: String
  food !: Food
  category !: Category

  constructor() {
    super()
    this.food = new Food()
    this.category = new Category()
    this.subscriptions = new Subscription()
  }

  ngOnInit(): void {

    this.spinner.show()

    this.foodId = this.activatedRoute.snapshot.paramMap.get('id') as String
    let subscription = this.foodService.getFoodById(this.foodId).subscribe({
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

    this.subscriptions.add(subscription)
  }

  getCategoryDetails(categoryName: String) {
    let subscription = this.foodService.getCategories().subscribe({
      next: (categories: Array<Category>) => {
        let categoryFound = categories.find((category) => category.title === categoryName)
        categoryFound ?? alert("hola")
        if (categoryFound) {
          this.category = categoryFound
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

    this.subscriptions.add(subscription)
  }

  showCategoryDetails() {
    this.renderer2Service.removeClass(this.modal.nativeElement, 'hidden')
  }

  closeCategoryDetails() {
    this.renderer2Service.addClass(this.modal.nativeElement, 'hidden')
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  trackByIngredientId: TrackByFunction<Ingredient>
    = (index: number, ingredient: Ingredient) => ingredient.id
}
