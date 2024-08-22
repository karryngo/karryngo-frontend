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
    public chartData = { labels: [], data: [] };
    public skillsData = { labels: [], data: [] };
    country: any;
    // months: string[] = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
    months: { name: string, selected: boolean, number: number }[] = [
        { name: 'Jan', selected: false, number: 1 },
        { name: 'Feb', selected: false, number: 2 },
        { name: 'Mar', selected: false, number: 3 },
        { name: 'Apr', selected: false, number: 4 },
        { name: 'May', selected: false, number: 5 },
        { name: 'Jun', selected: false, number: 6 },
        { name: 'Jul', selected: false, number: 7 },
        { name: 'Aug', selected: false, number: 8 },
        { name: 'Sep', selected: false, number: 9 },
        { name: 'Oct', selected: false, number: 10 },
        { name: 'Nov', selected: false, number: 11 },
        { name: 'Dec', selected: false, number: 12 }
    ];
    
    chart3: Chart;
    chart4: Chart;

    countCard = [
        { count: 23, label: 'Average Delivery Per Trip' },
        { count: 673, label: 'Sum of Trip' },
        { count: 139, label: 'Total Volume Number' },
        { count: 86440, label: 'Sum of Revenue Value' },
        { count: 86440, label: 'Revenue Value YTD' },
    ];


    current_user: Provider;
    options: {year: number, country: string, months: number[]} = { year: null, country: null, months: null };
    data: any;
    countries: any = [];
    selectedYear: number;
    selectedCountry: any;
    allowedYears: number[] = [];
    totalProviders: any = [];
    sumProviders: any;
    constructor(
            private authService:AuthService,
            private userService:UserService,
            private providerService: ProviderService,
            private locationService:LocationService,
        ) {
            this.setYear();
            this.getTotalProviders()
            this.authService.currentUserSubject.subscribe((user:any)=>{
                console.log(user)
                if (user._id && user._is!="") {
                    this.getUserById(user._id);
                }
                
            })
        }

    ngOnInit(): void {
        this.get_countries();
        // this.createCharts();
    }

    toggleMonthSelection(month: { name: string, selected: boolean }): void {
        month.selected = !month.selected;
        this.getProviderStats();
        // Call method here if needed
    }
    getSelectedMonthNumbers(): number[] {
        return this.months.filter(month => month.selected).map(month => month.number);
    }
    get_countries(){
        this.locationService.get_all_countries()
        .then((res) => {
            console.log(res);
            this.countries = res.result;
            this.selectedCountry = this.getDefaultCountry();
            // this.selectedCountry = res.result[2]?._id;
        })
    }
    getDefaultCountry(): any {
        if (this.countries && this.countries.length > 0) {
            return this.countries[3]._id;
        }
        return null;
    }
    setYear() {
        const currentYear = new Date().getFullYear();
        const minYear = 2020;
        const maxYear = 2099;
        for (let year = minYear; year <= maxYear; year++) {
            this.allowedYears.push(year);
        }
        this.options.year = currentYear;
        this.selectedYear = currentYear;
    }
    onYearSelected(): void {
        this.options.year = Number(this.selectedYear);
        this.getProviderStats();
    }
    
    onCountrySelected() {
        this.options.country = this.selectedCountry;
        this.getProviderStats();
        this.getProviderSkills();
    }
        

    getUserById(id: string){
        this.userService.getUserById(id).then((res)=>{
            console.log(res)
            this.current_user=res;
            if (res.adresse.country) {
                this.getProviderStats();
                this.getProviderSkills();
            }
        }).catch((err)=>{console.log(err)})
    }

    async getProviderStats() {
        this.options.months = this.getSelectedMonthNumbers();
        this.chartData.data = this.chartData.labels = [];
        this.providerService.getProviderStatistics(this.options).subscribe((result: any)=>{
            this.data = result.data;
            // console.log(this.data)
            // this.chartData.data = this.chartData.labels = [];
            if( result.data){ 
                this.data =  result.data;
                console.log(result.data)
                // this.chartData.data = this.chartData.labels = [];
                this.chartData.data = result.data.map(item => item.count);
                this.chartData.labels = result.data.map(item => item._id.month+"-"+item._id.year);
                // this.countCard1 = result.data.services.map(item => ({count: item.count, label: item._id.type, currency: item.currency.symbol}));
                // this.countCard2 = result.data.services.map(item => ({count: item.averageSuggestedPrice.toFixed(2)+" "+item.currency.symbol, label: "AVG Price | "+item._id.type}));
                // this.countCard3 = this.setData(result.data);
                // console.log(this.countCard1)
            } 
            console.log(this.chartData)
            // else {
            //     this.chartData.data = this.chartData.labels = [];
            //     // this.countCard1 = this.countCard2 = this.countCard3 = [];
            // }
        }, (error)=>{
            console.error('Error fetching company:', error);
        })
    }
    async getProviderSkills() {
        this.skillsData.data = this.skillsData.labels = [];
        this.providerService.getProviderSkills(this.options).subscribe((result: any)=>{
            this.data = result.data;
            if( result.data){ 
                this.data =  result.data;
                console.log(result.data)
                this.skillsData.data = result.data.map(item => item.count);
                this.skillsData.labels = result.data.map(item => item.service);
            } 
            console.log(this.skillsData)
        }, (error)=>{
            console.error('Error fetching company:', error);
        })
    }
    async getTotalProviders() {
        this.skillsData.data = this.skillsData.labels = [];
        this.providerService.getTotalProviders().subscribe((result: any)=>{
            this.totalProviders = result.data;
            this.totalProviders = result.data.map(item => ({count: item.count, label: item._id}));
            this.sumProviders = {count: Number(result.data.reduce((accumulator, currentValue) => accumulator + currentValue.count, 0)), label: "Total providers"}
            // let data: {labels:[], data: number[]};
            let data: {labels:[], data: number[]} = { labels: [], data: [] };
            data.data = result.data.map(item => item.count);
            data.labels = result.data.map(item => item._id);
            this.createCharts(data);
            console.log(data)
        }, (error)=>{
            console.error('Error fetching company:', error);
        })
    }








createCharts(data: any) {
    console.log(data)
    this.chart3 = new Chart('chart3', {
    type: 'doughnut',
    data: {
        labels: data.labels,
        datasets: [{
        label: 'Sales',
        data: data.data,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#007bff', '#6610f2', '#6f42c1', '#fd7e14', '#ffc107', '#28a745', '#17a2b8'],
        }]
    },
    options: {
        responsive: true,
        aspectRatio: 1,
    },
    });

        // this.chart4 = new Chart('chart4', {
        //     type: 'treemap',
        //     data: {
        //     datasets: [{
        //         label: 'City 1',
        //         data: [
        //         { x: 'Delivery 1', y: 218 },
        //         { x: 'Delivery 2', y: 149 },
        //         { x: 'Delivery 3', y: 184 },
        //         { x: 'Delivery 4', y: 184 }
        //         ],
        //     },
        //     {
        //         label: 'City 2',
        //         data: [
        //         { x: 'Delivery 1', y: 218 },
        //         { x: 'Delivery 2', y: 149 },
        //         { x: 'Delivery 3', y: 184 }
        //         ],
        //     }]
        //     },
        //     options: {
        //     aspectRatio: 1,
        //     },
        // });
    }
}
