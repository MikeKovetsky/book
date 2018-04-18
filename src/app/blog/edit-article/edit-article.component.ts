import { Component, OnInit } from '@angular/core';
import { Article } from "../shared/models/article.interface";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { BlogService } from "../shared/services/blog.service";
import { ActivatedRoute, Router } from "@angular/router";
import { debounceTime, distinctUntilChanged, map, skip } from "rxjs/operators";
import { DraftService } from "../shared/services/draft.service";
import { Draft } from "../shared/models/draft.interface";
import { SCHOOLS } from "./schools";

@Component({
    selector: 'book-edit-article',
    templateUrl: './edit-article.component.html',
    styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {
    readonly SCHOOLS = SCHOOLS;
    readonly abstractMaxLength = 1000;
    draft: Draft;
    form: FormGroup;
    articleId: number;
    backgroundColor: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder,
                private draftService: DraftService,
                private blogStorage: BlogService) {
        this.form = fb.group({
            title: ['', Validators.required],
            tags: [''],
            month: [''],
            year: [''],
            school: [''],
            course: [''],
            url: [''],
            author: [''],
            description: [''],
            abstract: ['', Validators.maxLength(this.abstractMaxLength)],
            color: ['']
        });
    }

    initDraft() {
        const latestDraft = this.draftService.getDraftWithoutArticle();
        if (latestDraft) {
            this.draft = latestDraft;
        } else {
            this.buildDraft(this.form.value);
        }
        this.updateForm(this.draft);
    }

    ngOnInit() {
        this.route.queryParams.pipe(
            map(p => p['articleId']),
        ).subscribe(articleId => {
            if (articleId !== undefined) {
                const article = this.blogStorage.getArticle(parseInt(articleId));
                if (article) {
                    this.articleId = articleId;
                    this.draft = this.draftService.getDraftByArticleId(article.id);
                    if (this.draft) {
                        this.updateForm(this.draft);
                    } else {
                        this.buildDraft(article);
                    }
                } else {
                    this.router.navigate(['/blog', 'edit-article']);
                }
            } else {
                this.initDraft();
            }
        });

        this.form.valueChanges.pipe(
            skip(1),
            debounceTime(this.draftService.draftSaveDebounceTimeMs),
            distinctUntilChanged()
        ).subscribe(value => this.saveDraft(value));
    }

    publishArticle() {
        this.markFormGroupTouched(this.form);
        if (this.form.invalid) {
            alert('Some of the fields are invalid!');
            return;
        }
        if (this.articleId) {
            const article: Article = Object.assign(this.form.value, {id: +this.articleId});
            this.blogStorage.updateArticle(this.articleId, article);
            alert('Article was edited!');
        } else {
            const newArticle = this.blogStorage.addArticle(this.form.value);
            this.draftService.removeDraft(this.draft.id);
            this.form.reset();
            alert('Article was added!');
            this.router.navigate(['/blog', 'article', newArticle.id]);
        }
    }

    setColor(color: string) {
        this.backgroundColor = color;
        this.form.get('color').setValue(color);
    }

    private saveDraft(article: Article, updateForm = false) {
        this.draft = Object.assign(this.draft, article, {
            saveDate: new Date(),
            articleId: +this.articleId
        });
        this.draftService.updateDraft(this.draft.id, this.draft);
        if (updateForm) {
            this.updateForm(this.draft);
        }
    }

    buildDraft(article: Article) {
        this.draft = Object.assign(article, {
            saveDate: new Date(),
            articleId: +this.articleId
        });
        this.draft = this.draftService.addDraft(this.draft);
        this.updateForm(this.draft);
    }

    // https://github.com/angular/angular/issues/11774
    private markFormGroupTouched(formGroup: FormGroup) {
        if (formGroup.controls) {
            Object.keys(formGroup.controls).forEach((key) => {
                const control = formGroup.controls[key];

                if (control instanceof FormControl) {
                    control.markAsTouched();
                    control.updateValueAndValidity();
                } else if (control instanceof FormGroup) {
                    this.markFormGroupTouched(control);
                }
            });
        }
    }

    private updateForm(article: Article) {
        for (const field in article) {
            if (this.form.get(field) !== null) {
                this.form.get(field).setValue(article[field]);
            }
        }
    }

}
