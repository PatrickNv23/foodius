import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { API_URL, STRING_INGREDIENT_PROPERTY } from 'src/app/core/constants/constanst';
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
        randomFood.ingredients = this.getIngredientsFromOneFood(result.meals[0])
        randomFood.tags = this.getTags(result.meals[0])

        return randomFood
      })
    )
  }

  getFoodsByFirstLetter(letter: String = "c"): Observable<Array<Food>> {

    return this.http.get<Array<Food>>(`${API_URL}/search.php?f=${letter}`).pipe(
      map((results: any) => {

        let foods = new Array<Food>()

        Array.from(results.meals).forEach((result: any) => {

          let food = new Food()
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

  getFoodById(id: String): Observable<Food> {
    return this.http.get<Food>(`${API_URL}/lookup.php?i=${id}`).pipe(
      map((result: any) => {

        let food = new Food()
        food.id = result.meals[0].idMeal
        food.title = result.meals[0].strMeal
        food.category = result.meals[0].strCategory
        food.area = result.meals[0].strArea
        food.instructions = result.meals[0].strInstructions
        food.imageUrl = result.meals[0].strMealThumb
        food.youtubeUrl = result.meals[0].strYoutube
        food.ingredients = this.getIngredientsFromOneFood(result.meals[0])
        food.tags = this.getTags(result.meals[0])

        return food
      })
    )
  }

  getIngredientsFromOneFood(result: any): Array<String> {

    let ingredientProperties: Array<String> = new Array<String>()
    let ingredientValues: Array<String> = new Array<String>()

    Object.keys(result).forEach((foodProperty) => {
      if (foodProperty.includes(`${STRING_INGREDIENT_PROPERTY}`)) {
        ingredientProperties.push(foodProperty)
      }
    })

    ingredientProperties.forEach((ingredientProperty) => {
      let ingredient: any = result[`${ingredientProperty}`]
      if (ingredient != null && ingredient !== "") {
        ingredientValues.push(ingredient)
      }
    })

    return ingredientValues
  }

  getTags(result: any): Array<String> {
    return result.strTags && result.strTags.split(",")
  }

}
