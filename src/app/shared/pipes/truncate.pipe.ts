import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

    transform(value: string, limit: number, disabled = false): string {
        if (disabled) {
            return value;
        }
        const ellipsis = '...';
        return value.length > limit ? value.substring(0, limit) + ellipsis : value;
    }
}