import {Component} from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'mls-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(public authService: AuthService) {
  }
}
