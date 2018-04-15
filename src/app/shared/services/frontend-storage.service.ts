import { Injectable } from '@angular/core';
import { LocalStorageService } from "./local-storage.service";

interface Storable {
    id: number;
}

function getMaxOfArray(numArray: number[]) {
    return Math.max.apply(null, numArray);
}

@Injectable()
export class FrontendStorageService<T extends Storable> {
    collectionPrefix = '';

    constructor(private localStorageService: LocalStorageService) {
    }

    addOne(newInstance: T) {
        newInstance.id = this.getNextId();
        const key = this.collectionPrefix + newInstance.id;
        this.localStorageService.setOne(key, JSON.stringify(newInstance));
    }

    updateOne(id: number, instance: T) {
        const key = this.collectionPrefix + id;
        this.localStorageService.setOne(key, JSON.stringify(instance));
    }

    getAll(): T[] {
        const keys = this.localStorageService.getAllStoragaKeys();
        return keys
            .filter(k => k.includes(this.collectionPrefix))
            .map(k => this.localStorageService.getOne(k))
            .map(a => JSON.parse(a));
    }

    getOne(id: number): T {
        const instances = this.getAll();
        return instances.find(a => a.id === id);
    }

    removeOne(id: number) {
        const key = this.collectionPrefix + id;
        this.localStorageService.removeOne(key);
    }

    private getNextId(): number {
        const ids = this.getAllInstancesKeysId();
        if (!ids.length) {
            return 0;
        }
        const maxId = getMaxOfArray(ids);
        return maxId + 1;
    }

    private getAllInstancesKeysId(): number[] {
        const keys = this.localStorageService.getAllStoragaKeys();
        const instancesKeys = keys.filter(k => k.includes(this.collectionPrefix));
        const ids = instancesKeys.map(k => k.replace(this.collectionPrefix, ''));
        return ids.map(id => parseInt(id)).sort();
    }

}
