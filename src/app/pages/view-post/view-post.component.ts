import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { IArticle } from '../../types/article'; // Assuming you have IArticle interface
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-view-post',
  imports: [CommonModule, MarkdownModule, MatDivider],
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.css',
})
export class ViewPostComponent implements OnInit {
  id: string = '';
  article: IArticle | undefined; // Article object to hold fetched data

  constructor(
    private contentService: ContentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        switchMap((params) => {
          this.id = params['id'] || ''; // Update id, use '' if undefined
          if (this.id) {
            return this.contentService.getArticleById(this.id);
          } else {
            return [undefined]; // Return observable of undefined to reset
          }
        })
      )
      .subscribe((article) => {
        this.article = article;
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateStateFromNavigation();
      });
  }

  updateStateFromNavigation() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
    } else {
    }
  }
}
