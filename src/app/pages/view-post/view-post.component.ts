import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { IArticle, IComment } from '../../types/article'; // Assuming you have IArticle interface
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { MatDivider } from '@angular/material/divider';
import { User } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';
import { InputComponent } from '../../components/input/input.component';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-view-post',
  imports: [
    CommonModule,
    MarkdownModule,
    MatDivider,
    FormsModule,
    InputComponent,
  ],
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.css',
})
export class ViewPostComponent implements OnInit {
  id: string = '';
  article: IArticle | undefined; // Article object to hold fetched data
  user: User | null = null;
  displayName = '';
  comment = '';
  listComment: IComment[] = [];

  constructor(
    private contentService: ContentService,
    private commentService: CommentService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.user = this.authService.getCurrentUser();
  }

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
        if (this.id) {
          this.commentService.getComments(this.id).subscribe((comments) => {
            this.listComment = comments;
          });
        }
        this.article = article;
      });
  }

  postComment() {
    const uid = this.user?.uid;
    const displayName = this.user?.displayName;
    this.commentService.addComment(uid, this.comment, this.id, displayName);
  }
}
