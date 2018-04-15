import { Injectable } from '@angular/core';
import { Draft } from "../models/draf.interface";
import { FrontendStorageService } from "../../../shared/services/frontend-storage.service";

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

    updateDraft(id: number, article: Draft) {
        article.saveDate = new Date();
        this.storageService.updateOne(id, article);
    }

    getAllDrafts(): Draft[] {
        return this.storageService.getAll();
    }

    getDraft(id: number): Draft {
        return this.storageService.getOne(id);
    }

    getDraftByArticleId(articleId: number): Draft {
        const drafts = this.getAllDrafts();
        return drafts.find(d => d.articleId === articleId);
    }

    removeDraft(id: number) {
        return this.storageService.removeOne(id);
    }

}
