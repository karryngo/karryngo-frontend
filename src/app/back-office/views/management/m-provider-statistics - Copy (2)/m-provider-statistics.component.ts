import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as Chart from 'chart.js';
import { AuthService } from '../../../../shared/service/auth/auth.service';
import { UserService } from '../../../../shared/service/user/user.service';
import { Provider } from '../../../../shared/entity/provider';
import { ProviderService } from '../../../../shared/service/back-office/provider.service';
import { LocationService } from '../../../../shared/service/location/location.service';

@Component({
selector: 'app-m-provider-statistics',
templateUrl: './m-provider-statistics.component.html',
styleUrls: ['./m-provider-statistics.component.css']
})
export class MProviderStatisticsComponent implements OnInit {

    months: string[];
    chart4: any;
    countCard = [
        { count: 2208, label: 'Total Sales' },
        { count: 350, label: 'Client Credit' },
        { count: 10, label: 'Lift' },
        { count: 15, label: 'Rentals' },
        { count: 21, label: 'Delivery' },
    ];
    createCharts() {
        const ctx = document.getElementById('myChart') as HTMLCanvasElement;
        // this.chart4 = new Chart("myChart", {
        //   type: 'bar',
        //   data: {
        //     labels: ['January', 'February', 'March'],
        //     datasets: [
        //       {
        //         label: 'Delivery',
        //         data: [9, 18, 13],
        //         backgroundColor: 'rgba(255, 99, 132, 0.2)',
        //         borderColor: 'rgba(255, 99, 132, 1)',
        //         borderWidth: 1,
        //       },
        //       {
        //         label: 'Lift',
        //         data: [11, 0, 9],
        //         backgroundColor: 'rgba(54, 162, 235, 0.2)',
        //         borderColor: 'rgba(54, 162, 235, 1)',
        //         borderWidth: 1,
        //       },
        //       {
        //         label: 'Rental',
        //         data: [18, 0, 8],
        //         backgroundColor: 'rgba(255, 206, 86, 0.2)',
        //         borderColor: 'rgba(255, 206, 86, 1)',
        //         borderWidth: 1,
        //       },
        //     ],
        //   },
        //   options: {
        //     scales: {
        //       yAxes: [{ ticks: { beginAtZero: true } }],
        //     },
        //   },
        // });
        this.chart4 = new Chart("myChart", {
            type: 'bar',
            data: {
              labels: ['January', 'February', 'March'],
              datasets: [
                {
                  label: 'Delivery',
                  data: [30, 60, 0],
                  backgroundColor: '#249cfc',
                  borderColor: '#249cfc',
                  borderWidth: 1,
                },
                {
                  label: 'Lift',
                  data: [55, 0, 45],
                  backgroundColor: '#28e4a4',
                  borderColor: '#28e4a4',
                //   backgroundColor: '#2596be',
                //   borderColor: '#2596be',
                  borderWidth: 1,
                },
                {
                  label: 'Rental',
                  data: [15, 40, 55],
                  backgroundColor: '#fdba3a',
                  borderColor: '#fdba3a',
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                yAxes: [{
                  stacked: true,
                  ticks: {
                    beginAtZero: true,
                    max: 100 // Set the maximum value of y-axis to 100
                  }
                }],
                xAxes: [{
                  stacked: true
                }]
              },
              tooltips: {
                mode: 'label',
                callbacks: {
                  label: function(tooltipItem, data) {
                    return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel + '%';
                  }
                }
              },
            },
          });
    }

    createCharts_() {
        this.chart4 = {
        chart: {
            type: 'bar',
            stacked: true,
            stackType: '100%',
            height: 500,
        },
        series: [
            {
            name: 'Delivery',
            data: [
                {
                x: 'January',
                y: 9,
                },
                {
                x: 'February',
                y: 18,
                },
                {
                x: 'March',
                y: 13,
                },
            ],
            },
            {
            name: 'Lift',
            data: [
                {
                x: 'January',
                y: 11,
                },
                {
                x: 'February',
                y: 0,
                },
                {
                x: 'March',
                y: 9,
                },
            ],
            },
            {
            name: 'Rental',
            data: [
                {
                x: 'January',
                y: 18,
                },
                {
                x: 'February',
                y: 0,
                },
                {
                x: 'March',
                y: 8,
                },
            ],
            },
        ],
        };
    }

    constructor() {
        this.months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', ];
    }

    ngOnInit(): void {
        this.createCharts();
    }
}
