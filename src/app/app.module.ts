import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { BlogModule } from "./blog/blog.module";
import { ArticleComponent } from "./blog/article/article.component";
import { ArticlesComponent } from "./blog/articles/articles.component";
import { LocalStorageService } from "./shared/services/local-storage.service";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([
            {path: '', redirectTo: 'blog', pathMatch: 'prefix'},
            {
                path: 'blog', children: [
                    {path: '', redirectTo: 'articles', pathMatch: 'prefix'},
                    {path: 'article/:articleId', component: ArticleComponent},
                    {path: 'articles', component: ArticlesComponent},
                    {path: 'new-article', component: ArticlesComponent}
                ]
            },
        ]),
        BlogModule
    ],
    providers: [LocalStorageService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
