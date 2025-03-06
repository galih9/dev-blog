import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Editor, NgxEditorModule } from 'ngx-editor';
import { InputComponent } from '../../components/input/input.component';
import { LabelComponent } from "../../components/label/label.component";

@Component({
  selector: 'app-create-post',
  imports: [NgxEditorModule, CommonModule, FormsModule, InputComponent, LabelComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent implements OnInit, OnDestroy {
  editor!: Editor;
  html = '';

  ngOnInit(): void {
    this.editor = new Editor();
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
