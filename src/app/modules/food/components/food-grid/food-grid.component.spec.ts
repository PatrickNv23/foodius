import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodGridComponent } from './food-grid.component';

describe('FoodGridComponent', () => {
  let component: FoodGridComponent;
  let fixture: ComponentFixture<FoodGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodGridComponent]
    });
    fixture = TestBed.createComponent(FoodGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
