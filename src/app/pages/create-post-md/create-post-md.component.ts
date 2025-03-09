import { Component, inject, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomButtonComponent } from '../../components/custom-button/custom-button.component';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../components/input/input.component';
import { LabelComponent } from '../../components/label/label.component';
import { User } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';
import dayjs from 'dayjs';

@Component({
  selector: 'app-create-post-md',
  imports: [
    CustomButtonComponent,
    MarkdownModule,
    FormsModule,
    InputComponent,
    LabelComponent,
  ],
  templateUrl: './create-post-md.component.html',
  styleUrl: './create-post-md.component.css',
})
export class CreatePostMdComponent {
  private contentService = inject(ContentService);
  private snackBar = inject(MatSnackBar);
  user: User | null = null;

  html = ``;
  title = '';

  constructor(private authService: AuthService) {
    this.user = this.authService.getCurrentUser();
  }

  // ngOnInit(): void {
  //   this.html = marked(this.html);
  // }

  submitPost = () => {
    this.contentService.addArticle(
      this.title,
      this.html,
      this.user?.uid,
      this.user?.displayName,
      dayjs().format('DD/MM/YYYY, HH:mm:ss'),
      dayjs().format('DD/MM/YYYY, HH:mm:ss')
    );
    this.snackBar.open('Post submitted successfully!', 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
    this.resetForm();
  };

  resetForm() {
    this.title = '';
    this.html = '';
  }
}
