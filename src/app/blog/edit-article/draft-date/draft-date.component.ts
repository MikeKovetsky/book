import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'book-draft-date',
  templateUrl: './draft-date.component.html',
  styleUrls: ['./draft-date.component.scss']
})
export class DraftDateComponent implements OnInit {
  @Input() date: Date;
  isShown = true;

  constructor() { }

  ngOnInit() {
  }

}
