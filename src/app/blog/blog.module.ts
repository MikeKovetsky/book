import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article/article.component';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';
import { MyMaterialModule } from "../shared/my-material/my-material.module";
import { ArticlesComponent } from './articles/articles.component';

@NgModule({
    imports: [
        CommonModule,
        MyMaterialModule
    ],
    declarations: [ArticleComponent, ArticlePreviewComponent, ArticlesComponent]
})
export class BlogModule {
}
