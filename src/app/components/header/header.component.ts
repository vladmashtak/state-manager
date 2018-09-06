import { Component } from '@angular/core';
import { AuthService } from '../../api/auth/auth.service';

@Component({
  selector: 'app-custom-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private auth: AuthService) {
  }

  public logout(): void {
    this.auth.logout();
  }
}
