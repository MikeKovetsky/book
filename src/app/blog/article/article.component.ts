import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ARTICLE } from "../shared/article.mock";
import { ArticleInterface } from "../shared/models/article.interface";

@Component({
    selector: 'book-article',
    templateUrl: './article.component.html'
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
