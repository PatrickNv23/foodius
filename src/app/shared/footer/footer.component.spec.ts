import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FooterComponent } from "./footer.component";

describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>
  let footerComponent: FooterComponent

  beforeEach(() => {
    TestBed.configureTestingModule({}).compileComponents();
    fixture = TestBed.createComponent(FooterComponent);
    footerComponent = fixture.componentInstance;
  })

  it('Should exist', () => {
    expect(footerComponent).toBeTruthy()
  })

  it(`Should be render 'PatrickNv23'`, () => {

    fixture.detectChanges()

    let compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('span')?.innerHTML).toEqual('PatrickNv23')
  })

})



