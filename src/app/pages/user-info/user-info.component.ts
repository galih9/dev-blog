import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-info',
  imports: [CommonModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
  user: User | null = null;

  constructor(private authService: AuthService) {
    this.user = this.authService.getCurrentUser();
  }
}
