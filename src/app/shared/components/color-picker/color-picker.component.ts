import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from "@angular/forms";

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
    @Input() initialColor: string;
    @Output() picked = new EventEmitter<string>();
    pickedColor: string;

    constructor() {
    }

    ngOnInit() {
        const initialColor = this.initialColor ? this.initialColor : this.colors[0];
        this.pickColor(initialColor);
    }

    pickColor(color: string) {
        this.pickedColor = color;
        this.picked.emit(color);
    }

}
