import { Component, Input, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

    @Input() chartData: { labels: string[], data: number[] };
    
    public chart: any  = new Chart("MyChart", {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: "Services",
                    data: [],
                    backgroundColor: 'blue'
                }
            ]
        },
        options: {
            aspectRatio: 2.5,
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'end',
                    font: {
                        weight: 'bold'
                    }
                }
            }
        }
    });
    public backgroundColor = [ 'rgba(54, 162, 235, 1)', 'rgba(54, 162, 235, 1)', 'rgba(54, 162, 235, 1)', 'rgba(54, 162, 235, 1)', 'rgba(54, 162, 235, 1)', 'rgba(54, 162, 235, 1)']
    public borderColor = [ 'rgba(54, 162, 235, 1)', 'rgba(54, 162, 235, 1)', 'rgba(54, 162, 235, 1)', 'rgba(54, 162, 235, 1)', 'rgba(54, 162, 235, 1)', 'rgba(54, 162, 235, 1)']

    constructor() { }

    ngOnInit(): void {
        this.createChart();
    }

    createChart(){
        console.log(this.chartData)
        if (this.chart) {
            this.chart.destroy(); 
        }
        this.chart = new Chart("MyChart", {
            type: 'bar',
            data: {
              labels: this.chartData.labels,
              datasets: [{
                label: 'Number of services',
                data: this.chartData.data,
                backgroundColor: this.backgroundColor,
                borderColor: this.borderColor,
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
