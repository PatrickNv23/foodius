import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../services/food.service';
import { Food } from 'src/app/core/models/food';
import { HttpErrorResponse } from '@angular/common/http';
import { SpinnerAbstraction } from 'src/app/core/abstractions/spinner.abstraction';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent extends SpinnerAbstraction implements OnInit {

  activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  foodService: FoodService = inject(FoodService)
  foodId !: String
  food !: Food

  constructor() {
    super()
    this.food = new Food()
  }

  ngOnInit(): void {

    this.spinner.show()

    this.foodId = this.activatedRoute.snapshot.paramMap.get('id') as String
    this.foodService.getFoodById(this.foodId).subscribe({
      next: (result: Food) => {
        this.food = result
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
