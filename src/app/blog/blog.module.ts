import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article/article.component';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [ArticleComponent, ArticlePreviewComponent]
})
export class BlogModule {
}
