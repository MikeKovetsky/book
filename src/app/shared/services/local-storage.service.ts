import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

    constructor() {
    }

    setOne(key: string, data: string) {
        localStorage.setItem(key, data);
    }

    getOne(key: string): string | null {
        return localStorage.getItem(key);
    }

    removeOne(key: string): void {
        localStorage.removeItem(key);
    }

    getAllStoragaKeys(): string[] {
        const keys = [];
        for (const key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    }

}
