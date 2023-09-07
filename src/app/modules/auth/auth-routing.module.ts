import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { isLoggedInGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    canActivate: [isLoggedInGuard]
  },
  {
    path: "sign-up",
    component: SignUpComponent,
    canActivate: [isLoggedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
