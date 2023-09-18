import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private authService: AuthService = inject(AuthService)
  private router: Router = inject(Router)
  user !: User

  ngOnInit(): void {
    this.user = this.authService.userData
  }

  logOut() {
    this.authService.logOut()
  }

  redirectToFoodsGrid() {
    this.router.navigate(['foods'])
  }
}
