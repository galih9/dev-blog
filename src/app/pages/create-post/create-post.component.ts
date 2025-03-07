import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Editor, NgxEditorModule } from 'ngx-editor';
import { InputComponent } from '../../components/input/input.component';
import { LabelComponent } from '../../components/label/label.component';
import { CustomButtonComponent } from '../../components/custom-button/custom-button.component';
import { ContentService } from '../../services/content.service';
import { Observable } from 'rxjs';

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

  // example
  content$: Observable<IArticle[]> | undefined;
  private contentService = inject(ContentService);

  ngOnInit(): void {
    this.editor = new Editor();
    this.content$ = this.contentService.getArticle();
    this.content$.subscribe((articles) => {
      console.log(articles);
    });
  }

  submitPost = () => {
    this.contentService.addArticle(this.title, this.html);
  };

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
