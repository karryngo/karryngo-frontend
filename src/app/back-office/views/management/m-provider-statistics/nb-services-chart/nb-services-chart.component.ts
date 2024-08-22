import { Component, Input, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
    selector: 'app-nb-services-chart',
    templateUrl: './nb-services-chart.component.html',
    styleUrls: ['./nb-services-chart.component.css']
})
export class NbServicesChartComponent implements OnInit {
    @Input() chartData: { labels: string[], data: number[] };
    chart1: Chart; 
    
    constructor() { }

    ngOnInit(): void {
        this.createCharts()
    }

    createCharts(){
        console.log(this.chartData)
        const backgroundColors = this.generateRandomColors(this.chartData.data.length);
        this.chart1 = new Chart('chart1', {
            type: 'pie',
            data: {
                labels: this.chartData.labels,
                datasets: [{
                    label: 'Skills',
                    data: this.chartData.data,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#007bff', '#6610f2', '#6f42c1', '#fd7e14', '#ffc107', '#28a745', '#17a2b8'],
                    // '#FF6384', '#36A2EB', '#FFCE56'
                }]
            },
            options: {
                responsive: true,
                aspectRatio: 1,
            },
        });
    }

    generateRandomColors(numColors: number): string[] {
        const colors: string[] = [];
        for (let i = 0; i < numColors; i++) {
            // Generate a random hex color code
            const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
            colors.push(color);
        }
        return colors;
    }

}
