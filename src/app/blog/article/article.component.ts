import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'book-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.queryParams.subscribe(p => console.log(p));
  }

}
