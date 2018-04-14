import { Component, OnInit } from '@angular/core';
import { ArticleInterface } from "../shared/models/article.interface";

@Component({
    selector: 'book-edit-article',
    templateUrl: './edit-article.component.html',
    styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {
    article: ArticleInterface;
    readonly abstractMaxLength = 1000;

    constructor() {
    }

    ngOnInit() {
    }

}
