import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ContentService } from '../../services/content.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface IArticle {
  title: string;
  content: string;
}

@Component({
  selector: 'app-post-list',
  imports: [CommonModule],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  articles: IArticle[] = [];
  content$: Observable<IArticle[]> | undefined;
  private contentService = inject(ContentService);

  constructor(private sanitizer: DomSanitizer) { }

  sanitizeContent(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  ngOnInit(): void {
    this.content$ = this.contentService.getArticle();
    this.content$.subscribe((articles) => {
      this.articles = articles;
    });
  }
}
