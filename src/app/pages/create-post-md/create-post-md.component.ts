import { Component, inject, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomButtonComponent } from '../../components/custom-button/custom-button.component';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-post-md',
  imports: [CustomButtonComponent, MarkdownModule, FormsModule],
  templateUrl: './create-post-md.component.html',
  styleUrl: './create-post-md.component.css',
})
export class CreatePostMdComponent {
  private contentService = inject(ContentService);
  private snackBar = inject(MatSnackBar);
  html = ``;
  title = '';

  // ngOnInit(): void {
  //   this.html = marked(this.html);
  // }

  submitPost = () => {
    this.contentService.addArticle(this.title, this.html);
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
