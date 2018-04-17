import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Article } from "../shared/models/article.interface";
import { BlogService } from "../shared/services/blog.service";
import { filter, map } from "rxjs/operators";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
    selector: 'book-article',
    templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {
    readonly maxArticleDescriptionLength = 700;
    article: Article;
    descriptionExpanded = false;
    tags: string[] = [];
    description: SafeHtml;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private domSanitizer: DomSanitizer,
                private blogStorage: BlogService) {
    }

    ngOnInit() {
        this.route.params.pipe(
            filter(params => params['articleId'] !== void 0),
            map((q) => parseInt(q['articleId'])),
        ).subscribe(id => this.loadArticle(id));
    }

    expandDescription() {
        this.descriptionExpanded = true;
    }

    removeArticle() {
        this.blogStorage.removeArticle(this.article.id);
        alert("Article removed");
        this.router.navigateByUrl('/');
    }

    private loadArticle(id: number) {
        this.article = this.blogStorage.getArticle(id);
        if (this.article) {
            this.tags = this.prepareTags(this.article.tags);
            this.description = this.prepareDescription(this.article.description);
        }
    }

    private prepareTags(tags: string): string[] {
        if (tags.length === 0) {
            return [];
        }
        return tags.split(',');
    }

    private prepareDescription(description: string) {
        return this.domSanitizer.bypassSecurityTrustHtml(description);
    }

}
