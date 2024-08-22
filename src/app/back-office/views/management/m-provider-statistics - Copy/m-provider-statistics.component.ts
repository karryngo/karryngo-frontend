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
  
    @ViewChild('barChart', { static: true }) barChartCanvas: ElementRef;

    public chart: any;
    public myPieChart: any;

    current_user: Provider;
    searchForm: FormGroup;
    data: any;
    mode: string[] = ["All", "Daily", "Weekly", "Monthly", "Yearly"];
    public myCondition = true;
    showCharts: boolean = true;

    countries: any = [];

    constructor(
        private cdr: ChangeDetectorRef,
        private authService:AuthService,
        private userService:UserService,
        private fb: FormBuilder,
        private providerService: ProviderService,
        private locationService:LocationService,
    ) {
        const currentDate = new Date();
        const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
        this.searchForm = this.fb.group({
            fromDate: [this.formatDate(firstDayOfYear)],
            toDate: [this.formatDate(currentDate)],
            sort: ['1'], // Default sort value is 1
            displayMode: [0],
            type: [[]],
            country_id: [''],
        });
        this.authService.currentUserSubject.subscribe((user:any)=>{
            console.log(user)
            if (user._id && user._is!="") {
                this.getUserById(user._id);
            }
            
        })
    }

    ngOnInit(): void {
        // this.createChart();
        // this.cdr.detectChanges();
        this.get_countries();
        this.searchForm.get('country_id').setValue('');
    }

    get_countries(){
        this.locationService.get_all_countries()
        .then((res) => {
            console.log(res);
            this.countries = res.result; 
        })
    }

    private formatDate(date: Date): string {
        // Format the date to 'YYYY-MM-DD' for the input[type="date"]
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }

    getUserById(id: string){
        this.userService.getUserById(id).then((res)=>{
            console.log(res)
            this.current_user=res;
            if (res.adresse.country) {
                console.log(this.searchForm.value)
                this.getProviderStats();
            }
        }).catch((err)=>{console.log(err)})
    }

    async getProviderStats() {
        this.searchForm.patchValue({
            displayMode: Number(this.searchForm.value.displayMode)
        });
        this.providerService.getProviderStats(this.searchForm.value).subscribe((result: any)=>{
            this.data = result.data;
            console.log(this.data)
            if(this.searchForm.value.displayMode==0) this.createPieChart(this.data);
            if(this.searchForm.value.displayMode!=0 && this.searchForm.value.country_id!="") {
                this.createChart(this.data);
                this.chart.update();
            } 
        }, (error)=>{
            console.error('Error fetching company:', error);
        })
    }

    dMode(){
        // console.log(this.searchForm.value.displayMode==0)
        return this.searchForm.value.displayMode==0;
    }



    // ngAfterViewInit(): void {
    //     // this.createChart();
    //     // this.cdr.detectChanges();
    // }

    createChart(data: any[]) {
        if (this.chart) {
            this.chart.destroy(); // Destroy the existing chart instance
        }
        let labels;
        if(this.searchForm.get('displayMode').value==1) labels = data.map(item => `${item._id.year}-${item._id.month}-${item._id.day}`);
        if(this.searchForm.get('displayMode').value==2) labels = data.map(item => `${item._id.year}-${item._id.week} ${item._id?.title}`);
        if(this.searchForm.get('displayMode').value==3) labels = data.map(item => `${item._id.year}-${item._id.month} ${item._id?.title}`);
        let nbProvider = data.map(item => item.count);
        // Generate random colors
        const backgroundColor = this.generateRandomColors(data.length);
        const borderColor = this.generateRandomColors(data.length);
        this.chart = new Chart("barChart", {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Number of Providers',
                    data: nbProvider,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
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
    // Function to generate random colors
    generateRandomColors(numColors: number): string[] {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`;
            colors.push(color);
        }
        return colors;
    }
    createPieChart(data: any[]) {
        if (this.myPieChart) {
            this.myPieChart.destroy(); // Destroy the existing chart instance
        }
        let labels = data.map(item => `${item.country?.name}-${item.count}`);
        let nbProvider = data.map(item => item.count);
        this.myPieChart = new Chart("pieChart", {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: nbProvider,
                    backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
                    hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
                }]
            },
            options: {
                responsive: true,
                legend: {
                    position: 'right',
                    labels: {
                        padding: 20,
                        boxWidth: 10
                    }
                },
                plugins: {
                    datalabels: {
                    formatter: (value, ctx) => {
                        let sum = 0;
                        let dataArr = ctx.chart.data.datasets[0].data;
                        dataArr.map(data => {
                        sum += data;
                        });
                        let percentage = (value * 100 / sum).toFixed(2) + "%";
                        return percentage;
                    },
                    color: 'white',
                    labels: {
                        title: {
                        font: {
                            size: '16'
                        }
                        }
                    }
                    }
                }
            }
        });
    }
}
