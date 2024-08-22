import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
    selector: 'app-nb-providers-chart',
    templateUrl: './nb-providers-chart.component.html',
    styleUrls: ['./nb-providers-chart.component.css']
})
export class NbProvidersChartComponent implements OnInit {
    @Input() chartData: { labels: string[], data: number[] };

    chart2: Chart;

    constructor(
        // private cdr: ChangeDetectorRef
        ) { }

    ngOnInit(): void {
        this.createCharts();
    }
    // ngOnChanges(): void {
    //     // Detect changes to @Input() properties
    //     // this.cdr.detectChanges();
    //     this.createCharts();
    // }

    createCharts(){
        console.log(this.chartData)
        this.chart2 = new Chart('chart2', {
            type: 'bar',
            data: {
                labels: this.chartData.labels,
                datasets: [{
                label: 'Delivery',
                data: this.chartData.data,
                backgroundColor: '#36A2EB',
                }]
            },
            options: {
                responsive: true,
                aspectRatio: 1,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true // Ensure the y-axis starts at 0
                        }
                    }]
                }
            },
        });
    }

}
