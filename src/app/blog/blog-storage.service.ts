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
        this.localStorageService.setOne(key, article.toString());
    }

    getArticles(): ArticleInterface[] {
        const keys = this.localStorageService.getAllStoragaKeys();
        return keys
            .filter(k => k.includes(this.collectionPrefix))
            .map(k => this.localStorageService.getOne(k))
            .map(a => JSON.parse(a));
    }

    private getNextId(): number {
        const ids = this.getAllArticlesId();
        const maxId = getMaxOfArray(ids);
        return maxId + 1;
    }

    private getAllArticlesId(): number[] {
        const keys = this.localStorageService.getAllStoragaKeys();
        const articleKeys = keys.filter(k => k.includes(this.collectionPrefix));
        const ids = articleKeys.map(k => k.replace(this.collectionPrefix, ''));
        return ids.map(parseInt).sort();
    }
}
