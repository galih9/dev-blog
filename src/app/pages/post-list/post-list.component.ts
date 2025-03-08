import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ContentService } from '../../services/content.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';
import { MatSnackBar } from '@angular/material/snack-bar';

interface IArticle {
  title: string;
  content: string;
  id: string;
}

@Component({
  selector: 'app-post-list',
  imports: [CommonModule, MarkdownModule],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  articles: IArticle[] = [];
  content$: Observable<IArticle[]> | undefined;
  private contentService = inject(ContentService);
  private snackBar = inject(MatSnackBar);

  constructor(private sanitizer: DomSanitizer) {}

  sanitizeContent(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  ngOnInit(): void {
    this.content$ = this.contentService.getArticle();
    this.content$.subscribe((articles) => {
      this.articles = articles;
    });
  }

  deletePost = (id: string) => {
    this.contentService
      .deleteArticle(id)
      .then(() => {
        this.snackBar.open('Post deleted successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      })
      .catch((error) => {
        this.snackBar.open('Someething went wrong!', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      });
  };
}
