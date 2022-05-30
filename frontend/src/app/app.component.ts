import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title!: string;

  constructor(private router: Router) {}

  isLoginPage() {
    return this.router.url === '/login';
  }

  isRegisterPage() {
    return this.router.url === '/register';
  }

  isRecoveryPage() {
    return this.router.url === '/recovery';
  }
}
