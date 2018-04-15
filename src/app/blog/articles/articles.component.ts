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
    hasPrev = false;
    hasNext = false;

    constructor(private blogStorage: BlogStorageService) {
    }

    ngOnInit() {
        this.fetchArticles();
    }

    fetchArticles() {
        this.articles = this.blogStorage.getArticles();
        this.loadArticle(0);
    }

    getPrevArticle() {
        const currentIndex = this.articles.indexOf(this.currentArticle);
        this.loadArticle(currentIndex - 1);
    }

    getNextArticle() {
        const currentIndex = this.articles.indexOf(this.currentArticle);
        this.loadArticle(currentIndex + 1);
    }

    private loadArticle(index: number) {
        this.currentArticle = this.articles[index];
        this.hasPrev = index - 1 >= 0;
        this.hasNext = index + 1 < this.articles.length;
    }

}
