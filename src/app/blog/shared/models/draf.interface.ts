import { Article } from "./article.interface";

export interface Draft extends Article {
    saveDate: Date;
    articleId: number;
}
