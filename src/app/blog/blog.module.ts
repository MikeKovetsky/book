import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article/article.component';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';
import { MyMaterialModule } from "../shared/my-material/my-material.module";
import { ArticlesComponent } from './articles/articles.component';
import { RouterModule } from "@angular/router";
import { TruncatePipe } from "../shared/pipes/truncate.pipe";
import { BlogStorageService } from "./blog-storage.service";

@NgModule({
    imports: [
        CommonModule,
        MyMaterialModule,
        RouterModule
    ],
    declarations: [ArticleComponent, ArticlePreviewComponent, ArticlesComponent, TruncatePipe],
    providers: [BlogStorageService]
})
export class BlogModule {
}
