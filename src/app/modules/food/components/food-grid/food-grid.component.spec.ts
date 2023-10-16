import { ComponentFixture, TestBed } from "@angular/core/testing"
import { FoodGridComponent } from "./food-grid.component"
import { FoodService } from "../../services/food.service";
import { of } from 'rxjs'
import { Food } from "src/app/core/models/food";

const randomFoodMock: Food = new Food();
randomFoodMock.id = "52962";
randomFoodMock.title = "Salmon Eggs Eggs Benedict";
randomFoodMock.category = "Breakfast";
randomFoodMock.area = "American";
randomFoodMock.instructions = "First make the Hollandaise sauce. Put the lemon juice and vinegar in a small bowl, add the egg yolks and whisk with a balloon whisk until light and frothy. Place the bowl over a pan of simmering water and whisk until mixture thickens. Gradually add the butter, whisking constantly until thick – if it looks like it might be splitting, then whisk off the heat for a few mins. Season and keep warm.\r\n\r\nTo poach the eggs, bring a large pan of water to the boil and add the vinegar. Lower the heat so that the water is simmering gently. Stir the water so you have a slight whirlpool, then slide in the eggs one by one. Cook each for about 4 mins, then remove with a slotted spoon.\r\n\r\nLightly toast and butter the muffins, then put a couple of slices of salmon on each half. Top each with an egg, spoon over some Hollandaise and garnish with chopped chives.";
randomFoodMock.imageUrl = "https://www.themealdb.com/images/media/meals/1550440197.jpg";
randomFoodMock.youtubeUrl = "https://www.youtube.com/watch?v=Woiiet4vQ58";
randomFoodMock.ingredients = [
  "Eggs",
  "White Wine Vinegar",
  "English Muffins",
  "Butter",
  "Smoked Salmon",
  "Lemon Juice",
  "White Wine Vinegar",
  "Egg",
  "Unsalted Butter"
];
randomFoodMock.tags = [
  "Bun",
  "Brunch"
];

const foodServiceMock = {
  getRandomFood: jest.fn()
}

describe('FoodGridComponent', () => {

  let fixture: ComponentFixture<FoodGridComponent>;
  let component: FoodGridComponent;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        { provide: FoodService, useValue: foodServiceMock }
      ]
    }).compileComponents()

    foodServiceMock.getRandomFood.mockReturnValue(of<Food>(randomFoodMock));
    fixture = TestBed.createComponent(FoodGridComponent);
    component = fixture.componentInstance;
  })

  it('should create the FoodGridComponent', () => {
    expect(component).toBeTruthy();
  })

  it('getRandomFood of the component should be called', () => {
    let getRandomFoodMock = jest.spyOn(component, 'getRandomFood')
    component.getRandomFood()
    expect(getRandomFoodMock).toHaveBeenCalled()
  })

  it('randomFood variable should exist and be an instance of Food class', () => {
    component.getRandomFood()
    expect(component.randomFood).toBeTruthy()
    expect(component.randomFood).toBeInstanceOf(Food)
  })

  it('randomFood should not be null', () => {
    component.getRandomFood();
    expect(component.randomFood).not.toBeNull();
  })

  it('getRandomFood of the service should return a Food type response', (done) => {
    foodServiceMock.getRandomFood().subscribe((response: Food) => {
      expect(response).toBeInstanceOf(Food)
      done()
    })
  })

  it('randomFood variable should be equal to the response of the getRandomFood method of the foodService', (done) => {

    let responseGetRandomFood: any;

    foodServiceMock.getRandomFood().subscribe((response: Food) => {
      responseGetRandomFood = response;
    })

    component.getRandomFood()
    expect(component.randomFood).toEqual(responseGetRandomFood as Food)
    done()
  })

})
