import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article/article.component';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';
import { MyMaterialModule } from "../shared/my-material/my-material.module";
import { ArticlesComponent } from './articles/articles.component';
import { RouterModule } from "@angular/router";
import { TruncatePipe } from "../shared/pipes/truncate.pipe";
import { BlogStorageService } from "./blog-storage.service";
import { EditArticleComponent } from './edit-article/edit-article.component';
import { ColorPickerComponent } from "../shared/components/color-picker/color-picker.component";
import { ReactiveFormsModule } from "@angular/forms";
import { EditorModule } from "@tinymce/tinymce-angular";
import { TagsPickerComponent } from "../shared/components/tags-picker/tags-picker.component";

@NgModule({
    imports: [
        CommonModule,
        MyMaterialModule,
        RouterModule,
        ReactiveFormsModule,
        EditorModule
    ],
    declarations: [
        ArticleComponent,
        ArticlePreviewComponent,
        ArticlesComponent,
        TruncatePipe,
        EditArticleComponent,
        ColorPickerComponent,
        TagsPickerComponent
    ],
    providers: [BlogStorageService]
})
export class BlogModule {
}
