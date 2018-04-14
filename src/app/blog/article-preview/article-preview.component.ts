import { Component, Input, OnInit } from '@angular/core';
import { ArticleInterface } from "../shared/models/article.interface";

@Component({
  selector: 'book-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss']
})
export class ArticlePreviewComponent implements OnInit {
  @Input() article: ArticleInterface;

  constructor() { }

  ngOnInit() {
  }

}
