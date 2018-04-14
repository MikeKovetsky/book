import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ArticleInterface } from "./article.interface";
import { ARTICLE } from "./article.mock";

@Component({
    selector: 'book-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
    article: ArticleInterface;
    descriptionExpanded = false;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.article = ARTICLE;
        this.route.queryParams.subscribe(p => console.log(p));
    }

    expandDescription() {
        this.descriptionExpanded = true;
    }

}
