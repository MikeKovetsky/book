import { Component, Input, OnInit } from '@angular/core';

const DEFAULT_COLORS = [
    '#00b51c',
    '#d4de1e',
    '#f5b56b',
    '#dd419e',
    '#de7894',
    '#468ecf',
    '#25deda',
    '#87deac',
];

@Component({
    selector: 'book-color-picker',
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {
    @Input() colors = DEFAULT_COLORS;
    pickedColor = this.colors[0];

    constructor() {
    }

    ngOnInit() {
    }

    pickColor(color: string) {
        this.pickedColor = color;
    }

}
