import { Component, OnInit } from '@angular/core';
import { Article } from "../shared/models/article.interface";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { BlogService } from "../shared/services/blog.service";
import { ActivatedRoute, Router } from "@angular/router";
import { debounceTime, distinctUntilChanged, filter, map, tap } from "rxjs/operators";
import { DraftService } from "../shared/services/draft.service";
import { Draft } from "../shared/models/draf.interface";

@Component({
    selector: 'book-edit-article',
    templateUrl: './edit-article.component.html',
    styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {
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

    ngOnInit() {
        this.route.queryParams.pipe(
            filter(p => p['articleId'] !== void 0),
            map(p => parseInt(p['articleId'])),
            tap(id => this.articleId = id),
            map(id => this.draftService.getDraftByArticleId(id)),
            map(draft => draft || this.blogStorage.getArticle(this.articleId))
        ).subscribe(draft => {
            if (draft) {
                this.saveDraft(draft);
                this.updateForm(draft)
            } else {
                this.router.navigate(['/blog', 'edit-article']);
            }
        });

        this.form.valueChanges.pipe(
            debounceTime(this.draftService.draftSaveDebounceTimeMs),
            distinctUntilChanged()
        ).subscribe(form => this.saveDraft(form.value));
    }

    publishArticle() {
        this.markFormGroupTouched(this.form);
        if (this.form.invalid) {
            alert('Some of the fields are invalid!');
            return;
        }
        if (this.articleId) {
            const article: Article = Object.assign(this.form.value, {id: this.articleId});
            this.blogStorage.updateArticle(this.articleId, article);
            alert('Article was edited!');
        } else {
            this.blogStorage.addArticle(this.form.value);
            alert('Article was added!');
        }
    }

    setColor(color: string) {
        this.backgroundColor = color;
        this.form.get('color').setValue(color);
    }

    private saveDraft(article: Article) {
        this.draft = Object.assign(article, {
            saveDate: new Date(),
            articleId: article.id
        });
        this.draftService.addDraft(this.draft);
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
        this.articleId = article.id;
        for (const field in article) {
            if (this.form.get(field) !== null) {
                this.form.get(field).setValue(article[field]);
            }
        }
    }

}
