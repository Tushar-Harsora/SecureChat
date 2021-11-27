import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

    storeValue(key: string, value: string){
        this.storage.set(key, value);
    }

    getValue(key: string){
        return this.storage.get(key);
    }
}
