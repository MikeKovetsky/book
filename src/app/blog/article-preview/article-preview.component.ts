import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleInterface } from "../shared/models/article.interface";
import { BlogStorageService } from "../blog-storage.service";

@Component({
    selector: 'book-article-preview',
    templateUrl: './article-preview.component.html',
    styleUrls: ['./article-preview.component.scss']
})
export class ArticlePreviewComponent implements OnInit {
    @Input() article: ArticleInterface;
    @Output() deleted = new EventEmitter<void>();

    constructor(private blogStorage: BlogStorageService) {
    }

    ngOnInit() {
    }

    removeArticle() {
        this.blogStorage.removeArticle(this.article.id);
        this.deleted.emit();
    }

}
