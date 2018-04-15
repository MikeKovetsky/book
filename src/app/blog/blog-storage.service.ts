import { Injectable } from '@angular/core';
import { ArticleInterface } from "./shared/models/article.interface";
import { LocalStorageService } from "../shared/services/local-storage.service";

function getMaxOfArray(numArray: number[]) {
    return Math.max.apply(null, numArray);
}

@Injectable()
export class BlogStorageService {
    private readonly collectionPrefix = 'articles.';

    constructor(private localStorageService: LocalStorageService) {
    }

    addArticle(article: ArticleInterface) {
        article.id = this.getNextId();
        const key = this.collectionPrefix + article.id;
        this.localStorageService.setOne(key, JSON.stringify(article));
    }

    updateArticle(articleId: number, article: ArticleInterface) {
        const key = this.collectionPrefix + articleId;
        this.localStorageService.setOne(key, JSON.stringify(article));
    }

    getArticles(): ArticleInterface[] {
        const keys = this.localStorageService.getAllStoragaKeys();
        return keys
            .filter(k => k.includes(this.collectionPrefix))
            .map(k => this.localStorageService.getOne(k))
            .map(a => JSON.parse(a));
    }

    getArticle(id: number): ArticleInterface {
        const articles = this.getArticles();
        return articles.find(a => a.id === id);
    }

    private getNextId(): number {
        const ids = this.getAllArticlesId();
        if (!ids.length) {
            return 0;
        }
        const maxId = getMaxOfArray(ids);
        return maxId + 1;
    }

    private getAllArticlesId(): number[] {
        const keys = this.localStorageService.getAllStoragaKeys();
        const articleKeys = keys.filter(k => k.includes(this.collectionPrefix));
        const ids = articleKeys.map(k => k.replace(this.collectionPrefix, ''));
        return ids.map(id => parseInt(id)).sort();
    }
}
