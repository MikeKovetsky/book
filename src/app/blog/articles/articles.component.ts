import { Component, OnInit } from '@angular/core';
import { ArticleInterface } from "../shared/models/article.interface";
import { BlogStorageService } from "../blog-storage.service";

@Component({
    selector: 'book-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
    articles: ArticleInterface[];
    currentArticle: ArticleInterface;

    constructor(private blogStorage: BlogStorageService) {
    }

    ngOnInit() {
        this.articles = this.blogStorage.getArticles();
        this.currentArticle = this.articles[0];
    }

}
