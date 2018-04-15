import { Component, OnInit } from '@angular/core';
import { ArticleInterface } from "../shared/models/article.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
            abstract: [''],
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
                this.updateForm(article)
            } else {
                this.router.navigate(['/blog', 'edit-article']);
            }
        });
    }

    saveArticle() {
        if (this.form.invalid) {
            alert('Some required fields are empty!');
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

    private updateForm(article: ArticleInterface) {
        this.articleId = article.id;
        for (const field in article) {
            if (this.form.get(field) !== null) {
                this.form.get(field).setValue(article[field]);
            }
        }
    }

}
