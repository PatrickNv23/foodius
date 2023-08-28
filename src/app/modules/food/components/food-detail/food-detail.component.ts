import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../services/food.service';
import { Food } from 'src/app/core/models/food';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit {

  activatedRoute = inject(ActivatedRoute)
  foodService = inject(FoodService)
  foodId !: String
  food !: Food

  constructor() {
    this.food = new Food()
  }

  ngOnInit(): void {

    this.foodId = this.activatedRoute.snapshot.paramMap.get('id') as String
    this.foodService.getFoodById(this.foodId).subscribe({
      next: (result: Food) => {
        this.food = result
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
