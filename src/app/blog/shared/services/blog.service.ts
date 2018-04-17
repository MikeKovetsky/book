import { Injectable } from '@angular/core';
import { Article } from "../models/article.interface";
import { FrontendStorageService } from "../../../shared/services/frontend-storage.service";
import { DraftService } from "./draft.service";

@Injectable()
export class BlogService {

    constructor(private storageService: FrontendStorageService<Article>, private draftService: DraftService) {
        storageService.collectionPrefix = 'articles';
    }

    addArticle(article: Article) {
        this.storageService.addOne(article);
    }

    updateArticle(articleId: number, article: Article) {
        this.storageService.updateOne(articleId, article);
    }

    getArticles(): Article[] {
        return this.storageService.getAll();
    }

    getArticle(id: number): Article {
        return this.storageService.getOne(id);
    }

    removeArticle(id: number) {
        const draft = this.draftService.getDraftByArticleId(id);
        if (draft) {
            this.draftService.removeDraft(draft.id);
        }
        return this.storageService.removeOne(id);
    }
}
