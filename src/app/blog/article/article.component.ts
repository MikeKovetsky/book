import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ArticleInterface } from "../shared/models/article.interface";
import { BlogStorageService } from "../blog-storage.service";
import { filter, map, tap } from "rxjs/operators";

@Component({
    selector: 'book-article',
    templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {
    article: ArticleInterface;
    descriptionExpanded = false;
    tags: string[] = [];
    readonly maxArtcileDescriptionLength = 700;

    constructor(private route: ActivatedRoute, private blogStorage: BlogStorageService) {
    }

    ngOnInit() {
        this.route.params.pipe(
            tap(a => console.log(a)),
            filter(params => params['articleId'] !== void 0),
            map((q) => parseInt(q['articleId'])),
        ).subscribe(id => this.loadArticle(id));
    }

    expandDescription() {
        this.descriptionExpanded = true;
    }

    private loadArticle(id: number) {
        this.article = this.blogStorage.getArticle(id);
        this.tags = this.prepareTags(this.article.tags);
    }

    private prepareTags(tags: string): string[] {
        if (tags.length === 0) {
            return [];
        }
        return tags.split(',');
    }

}
