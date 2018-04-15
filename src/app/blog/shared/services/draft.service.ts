import { Injectable } from '@angular/core';
import { Article } from "../models/article.interface";
import { FrontendStorageService } from "../../../shared/services/frontend-storage.service";

interface Draft extends Article {
    saveDate: Date;
}

@Injectable()
export class DraftService {
    readonly draftSaveDebounceTimeMs = 2000;

    constructor(private storageService: FrontendStorageService<Draft>) {
        storageService.collectionPrefix = 'drafts';
    }

    addDraft(article: Draft) {
        article.saveDate = new Date();
        this.storageService.addOne(article);
    }

    updateDraft(articleId: number, article: Draft) {
        article.saveDate = new Date();
        this.storageService.updateOne(articleId, article);
    }

    getAllDraft(): Draft[] {
        return this.storageService.getAll();
    }

    getDraft(id: number): Draft {
        return this.storageService.getOne(id);
    }

    removeDraft(id: number) {
        return this.storageService.removeOne(id);
    }

}
