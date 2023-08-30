import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, share } from 'rxjs/operators';
import { API_URL, STRING_INGREDIENT_PROPERTY } from 'src/app/core/constants/constanst';
import { Category } from 'src/app/core/models/category';
import { Food } from 'src/app/core/models/food';
import { Ingredient } from 'src/app/core/models/ingredient';

@Injectable({
  providedIn: 'root'
})
export class FoodService {


  http: HttpClient = inject(HttpClient)

  // GET BASIC ENDPOINTS (RANDOMFOOD, FOODS, FOOD_BY_ID)

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
      }),
      share()
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
      }),
      share()
    )
  }

  getFoodById(id: String): Observable<Food> {
    return this.http.get<Food>(`${API_URL}/lookup.php?i=${id}`).pipe(
      map((result: any) => {
        console.log(result)
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
      }),
      share()
    )
  }

  // GET DATA TO SELECTS (CATEGORIES, AREAS, INGREDIENTS)

  getCategories(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(`${API_URL}/categories.php`).pipe(
      map((result: any) => {
        let categories: Array<Category> = new Array<Category>()

        Array.from(result.categories).forEach((data: any) => {
          let category: Category = new Category()
          category.id = data.idCategory
          category.title = data.strCategory
          category.imageUrl = data.strCategoryThumb
          category.description = data.strCategoryDescription

          categories.push(category)
        })

        return categories
      }),
      share()
    )
  }

  getFirstTenAreas(): Observable<any> {
    return this.http.get<any>(`${API_URL}/list.php?a=list`).pipe(
      map((result) => result.meals.slice(0, 10)),
      share()
    )
  }

  getFirstTenIngredients(): Observable<Array<Ingredient>> {
    return this.http.get<Array<Ingredient>>(`${API_URL}/list.php?i=list`).pipe(
      map((result: any) => {
        let ingredients: Array<Ingredient> = new Array<Ingredient>()

        Array.from(result.meals).forEach((data: any) => {
          let ingredient: Ingredient = new Ingredient()
          ingredient.id = data.idIngredient
          ingredient.title = data.strIngredient
          ingredient.description = data.strDescription
          ingredient.type = data.strType

          ingredients.push(ingredient)
        })

        return ingredients.slice(0, 10)
      }),
      share()
    )
  }

  // FILTERS (NAME, CATEGORY, AREA, INGREDIENT)

  getFoodsByName(name: String): Observable<Array<Food>> {
    return this.http.get<Array<Food>>(`${API_URL}/search.php?s=${name}`).pipe(
      map((results: any) => {

        let foods = new Array<Food>()

        Array.from(results.meals).forEach((result: any) => {

          let food = new Food()
          food.id = result.idMeal
          food.title = result.strMeal
          food.imageUrl = result.strMealThumb

          foods.push(food)
        })

        return foods
      }),
      share()
    )
  }

  findByCategory(category: String): Observable<Array<Food>> {
    return this.http.get<Array<Food>>(`${API_URL}/filter.php?c=${category}`).pipe(
      map((results: any) => {

        let foods = new Array<Food>()

        Array.from(results.meals).forEach((result: any) => {

          let food = new Food()
          food.id = result.idMeal
          food.title = result.strMeal
          food.imageUrl = result.strMealThumb

          foods.push(food)
        })

        return foods
      }),
      share()
    )
  }

  findByArea(area: String): Observable<Array<Food>> {
    return this.http.get<Array<Food>>(`${API_URL}/filter.php?a=${area}`).pipe(
      map((results: any) => {

        let foods = new Array<Food>()

        Array.from(results.meals).forEach((result: any) => {

          let food = new Food()
          food.id = result.idMeal
          food.title = result.strMeal
          food.imageUrl = result.strMealThumb

          foods.push(food)
        })

        return foods
      }),
      share()
    )
  }

  findByMainIngredient(mainIngredient: String): Observable<Array<Food>> {
    return this.http.get<Array<Food>>(`${API_URL}/filter.php?i=${mainIngredient}`).pipe(
      map((results: any) => {

        let foods = new Array<Food>()

        Array.from(results.meals).forEach((result: any) => {

          let food = new Food()
          food.id = result.idMeal
          food.title = result.strMeal
          food.imageUrl = result.strMealThumb

          foods.push(food)
        })

        return foods
      }),
      share()
    )
  }

  // TRANSFORMS 

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
