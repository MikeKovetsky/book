import { Component, OnInit } from '@angular/core';
import { ArticleInterface } from "../shared/models/article.interface";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { BlogStorageService } from "../blog-storage.service";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, map } from "rxjs/operators";

@Component({
    selector: 'book-edit-article',
    templateUrl: './edit-article.component.html',
    styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {
    readonly abstractMaxLength = 1000;
    article: ArticleInterface;
    form: FormGroup;
    articleId: number;
    backgroundColor: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder,
                private blogStorage: BlogStorageService) {
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
            map(id => this.blogStorage.getArticle(id)),
        ).subscribe(article => {
            if (article) {
                this.article = article;
                this.updateForm(article)
            } else {
                this.router.navigate(['/blog', 'edit-article']);
            }
        });
    }

    saveArticle() {
        this.markFormGroupTouched(this.form);
        if (this.form.invalid) {
            alert('Some of the fields are invalid!');
            return;
        }
        if (this.articleId) {
            const article: ArticleInterface = Object.assign(this.form.value, {id: this.articleId});
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

    private updateForm(article: ArticleInterface) {
        this.articleId = article.id;
        for (const field in article) {
            if (this.form.get(field) !== null) {
                this.form.get(field).setValue(article[field]);
            }
        }
    }

}
