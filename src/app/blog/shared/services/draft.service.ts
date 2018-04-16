import { Injectable } from '@angular/core';
import { Draft } from "../models/draft.interface";
import { FrontendStorageService } from "../../../shared/services/frontend-storage.service";
import { LocalStorageService } from "../../../shared/services/local-storage.service";

@Injectable()
export class DraftService {
    readonly draftSaveDebounceTimeMs = 1000;
    storageService: FrontendStorageService<Draft>;

    constructor(private localStorageService: LocalStorageService) {
        this.storageService = new FrontendStorageService<Draft>(localStorageService);
        this.storageService.collectionPrefix = 'drafts';
    }

    addDraft(draft: Draft) {
        draft.saveDate = new Date();
        this.storageService.addOne(draft);
    }

    updateDraft(id: number, draft: Draft) {
        draft.saveDate = new Date();
        this.storageService.updateOne(id, draft);
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

    clearDraftWithoutArticle() {
        const drafts = this.getAllDrafts();
        const draft = drafts.find(d => d.articleId === null);
        this.removeDraft(draft.id);
    }

    getDraftWithoutArticle() {
        const drafts = this.getAllDrafts();
        return drafts.find(d => d.articleId === null);
    }

    removeDraft(id: number) {
        return this.storageService.removeOne(id);
    }

}
