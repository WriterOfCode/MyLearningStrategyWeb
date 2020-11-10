import { Component } from '@angular/core';
import { AuthService } from './shared/auth/auth.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'mls-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    faCoffee = faCoffee;
    constructor(public authService: AuthService) {
    }
}
