// src/app/pagination.service.ts
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PaginationService {
    paginate(items: any[], currentPage: number, pageSize: number): any[] {
        const startIndex = (currentPage - 1) * pageSize;
        return items.slice(startIndex, startIndex + pageSize);
    }
}
