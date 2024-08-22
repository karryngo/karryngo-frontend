import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-count-cart',
    templateUrl: './count-cart.component.html',
    styleUrls: ['./count-cart.component.css']
})
export class CountCartComponent implements OnInit {
    @Input() count = 0;
    @Input() text = '';
    constructor() {}

    ngOnInit(): void {
    }

    formatNumber(value: number): string {
        if (value >= 1e9) {
            return (value / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
        }
        if (value >= 1e6) {
            return (value / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (value >= 1e3) {
            return (value / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return value.toString();
    }
}

