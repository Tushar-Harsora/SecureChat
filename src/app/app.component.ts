import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'SecureChat';
  _authenticationService: AuthenticationService;
  constructor(
    private router: Router,
    public authenticationService: AuthenticationService
    ) {
      this._authenticationService = authenticationService;
    }
}
