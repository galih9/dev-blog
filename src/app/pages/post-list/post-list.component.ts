import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ContentService } from '../../services/content.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IArticle } from '../../types/article';
import { ShortifyContentPipe } from '../../utils/pipes/shortify-content/shortify-content.pipe';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  imports: [CommonModule, MarkdownModule, ShortifyContentPipe],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  articles: IArticle[] = [];
  content$: Observable<IArticle[]> | undefined;
  private contentService = inject(ContentService);
  private snackBar = inject(MatSnackBar);

  constructor(private sanitizer: DomSanitizer, private router: Router) {}

  sanitizeContent(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  ngOnInit(): void {
    this.content$ = this.contentService.getArticle();
    this.content$.subscribe((articles) => {
      this.articles = articles;
    });
  }

  viewPost(id: string, title: string) {
    const extras = {
      showBack: true,
      sidebarTitle: title,
    };
    this.router.navigate(['/detail-post'], {
      queryParams: { id: id },
      state: extras,
    });
  };

  deletePost = (id: string) => {
    // this.contentService
    //   .deleteArticle(id)
    //   .then(() => {
    //     this.snackBar.open('Post deleted successfully!', 'Close', {
    //       duration: 3000,
    //       horizontalPosition: 'right',
    //       verticalPosition: 'top',
    //     });
    //   })
    //   .catch((error) => {
    //     this.snackBar.open('Someething went wrong!', 'Close', {
    //       duration: 3000,
    //       horizontalPosition: 'right',
    //       verticalPosition: 'top',
    //     });
    //   });
  };
}
