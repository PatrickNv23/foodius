import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  private authService: AuthService = inject(AuthService)
  private router: Router = inject(Router)

  logOut() {
    this.authService.logOut()
  }

  redirectToFoodsGrid() {
    this.router.navigate(['foods'])
  }
}
