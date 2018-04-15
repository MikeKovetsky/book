import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
    selector: 'book-tags-picker',
    templateUrl: './tags-picker.component.html',
    styleUrls: ['./tags-picker.component.scss']
})
export class TagsPickerComponent implements OnInit {
    readonly MAX_TAGS_LENGTH = 3;
    @Input() initialTags: string = '';
    @Output() picked = new EventEmitter<string>();
    newTagControl = new FormControl('');
    tags: string[] = [];

    constructor() {
    }

    ngOnInit() {
        if (this.initialTags) {
            this.tags = this.initialTags.split(',');
        }
    }

    add(tag: string) {
        if (this.tags.length < this.MAX_TAGS_LENGTH) {
            this.tags.push(tag);
            this.emitTags()
        }
    }

    remove(tag: string) {
        this.tags = this.tags.filter(t => t !== tag);
        this.emitTags()
    }

    private emitTags() {
        this.picked.emit(this.tags.join(','));
    }

}
