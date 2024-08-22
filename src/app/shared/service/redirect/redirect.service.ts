import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RedirectService {

    constructor() { }

    redirectToExternalUrl(url: string): void {
        window.open(url, '_blank');
    }
}
