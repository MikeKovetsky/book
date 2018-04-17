import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface Option {
    text: string;
    imageSrc?: string;
}

@Component({
    selector: 'book-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
    @Input() options: Option[] = []; // option.text must be unique
    @Input() initialValue: string;
    @Output() picked = new EventEmitter<string>();
    isCoolDown = false;
    chosen: Option;


    constructor() {
    }

    ngOnInit() {
        const initialOption = this.options.find(o => o.text === this.initialValue);
        this.chooseOption(initialOption || this.options[0])
    }

    chooseOption(option: Option) {
        this.chosen = option;
        this.picked.emit(option.text);
        this.isCoolDown = true;
        setTimeout(() => this.isCoolDown = false, 100);
    }

}
