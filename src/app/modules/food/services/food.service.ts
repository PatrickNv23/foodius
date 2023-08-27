import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { API_URL } from 'src/app/core/constants/constanst';
import { Food } from 'src/app/core/models/food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {


  http: HttpClient = inject(HttpClient)

  getRandomFood(): Observable<Food> {

    return this.http.get<Food>(`${API_URL}/random.php`).pipe(
      map((result: any) => {

        let randomFood = new Food()
        randomFood.id = result.meals[0].idMeal
        randomFood.title = result.meals[0].strMeal
        randomFood.category = result.meals[0].strCategory
        randomFood.area = result.meals[0].strArea
        randomFood.instructions = result.meals[0].strInstructions
        randomFood.imageUrl = result.meals[0].strMealThumb
        randomFood.youtubeUrl = result.meals[0].strYoutube

        return randomFood
      })
    )
  }

  getFoodsByFirstLetter(letter: String = "c"): Observable<Array<Food>> {

    return this.http.get<Array<Food>>(`${API_URL}/search.php?f=${letter}`).pipe(
      map((results: any) => {

        let food = new Food()
        let foods = new Array<Food>()

        Array.from(results.meals).forEach((result: any) => {

          food.id = result.idMeal
          food.title = result.strMeal
          food.category = result.strCategory
          food.area = result.strArea
          food.instructions = result.strInstructions
          food.imageUrl = result.strMealThumb
          food.youtubeUrl = result.strYoutube

          foods.push(food)
        })

        return foods
      })
    )
  }

}
