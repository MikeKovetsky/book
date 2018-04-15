import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from "../shared/models/article.interface";
import { BlogService } from "../shared/services/blog.service";

@Component({
    selector: 'book-article-preview',
    templateUrl: './article-preview.component.html',
    styleUrls: ['./article-preview.component.scss']
})
export class ArticlePreviewComponent implements OnInit {
    @Input() article: Article;
    @Output() deleted = new EventEmitter<void>();

    constructor(private blogStorage: BlogService) {
    }

    ngOnInit() {
    }

    removeArticle() {
        this.blogStorage.removeArticle(this.article.id);
        this.deleted.emit();
    }

}
