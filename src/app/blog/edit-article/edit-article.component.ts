import { Component, OnInit } from '@angular/core';
import { ArticleInterface } from "../shared/models/article.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BlogStorageService } from "../blog-storage.service";

@Component({
    selector: 'book-edit-article',
    templateUrl: './edit-article.component.html',
    styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {
    article: ArticleInterface;
    readonly abstractMaxLength = 1000;
    form: FormGroup;

    constructor(private fb: FormBuilder, private blogStorage: BlogStorageService) {
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
    }

    saveArticle() {
        if (this.form.invalid) {
            alert('Some required fields are empty!');
            return;
        }
        console.log(this.form.value);
        this.blogStorage.addArticle(this.form.value);
        alert('Article was added!');
    }

    setColor(color: string) {
        this.form.get('color').setValue(color);
    }

}
