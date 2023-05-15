import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'webonjour-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  constructor(private authService: AuthService, private router: Router) {}

  get jwtPayload() {
    return this.authService.jwtPayload;
  }

  logout() {
    this.authService.logout();
    // redirect to login page
    this.router.navigate(['/login']).then();
  }
}
