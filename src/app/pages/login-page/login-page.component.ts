import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomButtonComponent } from '../../components/custom-button/custom-button.component';
import { AuthService } from '../../services/auth.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-page',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomButtonComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  loginWithGoogleEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private authService: AuthService) {
    this.loginWithGoogleEvent.subscribe(() => this.loginWithGoogle());
  }

  async loginWithGoogle() {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      await this.authService.googleSignIn();
    } catch (error) {
      this.errorMessage = (error as any).message;
    } finally {
      this.isLoading = false;
    }
  }
}
