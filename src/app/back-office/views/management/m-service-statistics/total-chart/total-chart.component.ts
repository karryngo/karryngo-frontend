import { Component, Input, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
    selector: 'app-total-chart',
    templateUrl: './total-chart.component.html',
    styleUrls: ['./total-chart.component.css']
})
export class TotalChartComponent implements OnInit {
    @Input() data: { labels: string[], data: number[], type: "" };
    public chart: any

    constructor() { }

    ngOnInit(): void {
        this.createChart();
    }

    createChart(){
        console.log(this.data)
        if (this.chart) {
            this.chart.destroy(); 
        }
        this.chart = new Chart("TotalChart", {
            type: 'bar',
            data: {
                labels: this.data.labels,
                datasets: [{
                    label: "Number of services by Country",
                    data: this.data.data,
                    backgroundColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                yAxes: [{
                    ticks: {
                    beginAtZero: true
                    }
                }]
                }
            }
        });
    }

}
