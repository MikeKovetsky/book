import { Component, OnInit } from '@angular/core';
import { ArticleInterface } from "../article/article.interface";
import { ARTICLE } from "../article/article.mock";

@Component({
  selector: 'book-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
    article: ArticleInterface;

  constructor() { }

  ngOnInit() {
      this.article = ARTICLE;
  }

}
