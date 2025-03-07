import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Editor, NgxEditorModule } from 'ngx-editor';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { InputComponent } from '../../components/input/input.component';
import { LabelComponent } from '../../components/label/label.component';
import { CustomButtonComponent } from '../../components/custom-button/custom-button.component';
import { ContentService } from '../../services/content.service';

interface IArticle {
  title: string;
  content: string;
}

@Component({
  selector: 'app-create-post',
  imports: [
    NgxEditorModule,
    CommonModule,
    FormsModule,
    MatSnackBarModule,
    InputComponent,
    LabelComponent,
    CustomButtonComponent,
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent implements OnInit, OnDestroy {
  editor!: Editor;
  html = '';
  title = '';

  private contentService = inject(ContentService);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.editor = new Editor();
  }

  submitPost = () => {
    this.contentService.addArticle(this.title, this.html);
    this.snackBar.open('Post submitted successfully!', 'Close', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
    this.resetForm();
  };

  resetForm() {
    this.title = '';
    this.html = '';
    this.editor.setContent('');
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
