import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SkeletonComponent } from './skeleton/skeleton.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SkeletonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkeletonComponent
  ]
})
export class SharedModule { }
