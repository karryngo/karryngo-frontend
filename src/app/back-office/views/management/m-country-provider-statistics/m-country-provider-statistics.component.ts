import { CountryManagementService } from './../../../../shared/service/back-office/country-management.service';
import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { AuthService } from '../../../../shared/service/auth/auth.service';
import { UserService } from '../../../../shared/service/user/user.service';
import { Provider } from '../../../../shared/entity/provider';
import { ProviderService } from '../../../../shared/service/back-office/provider.service';
import { LocationService } from '../../../../shared/service/location/location.service';


@Component({
    selector: 'app-m-country-provider-statistics',
    templateUrl: './m-country-provider-statistics.component.html',
    styleUrls: ['./m-country-provider-statistics.component.css']
})
export class MCountryProviderStatisticsComponent implements OnInit {

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
    allowedYears: number[] = [];
    totalProviders: any = [];
    sumProviders: any;
    constructor(
            private authService:AuthService,
            private userService:UserService,
            private providerService: ProviderService,
            private locationService:LocationService,
            private countryManagementService: CountryManagementService,
        ) {
            this.setYear();
            this.authService.currentUserSubject.subscribe((user:any)=>{
                console.log(user)
                if (user._id && user._is!="") {
                    // this.getCountryOfManager(user._id);
                    this.getUserById(user._id);
                }
                
            })
        }

    ngOnInit(): void {
        // this.get_countries();
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

    getCountryOfManager(user_id: string) {
        this.countryManagementService.getCountryOfManager(user_id).subscribe(async(res: any)=>{
            this.options.country = await res.data?.country?._id;
            console.log(res.data?.country);
            console.log(res.data?.country?._id);
            await this.getProviderStats();
            await this.getSumCountryProviders(res.data?.country?._id)
            this.getProviderSkills();
        }, (error)=>{
            console.log(error);
        })
    }
        

    getUserById(id: string){
        this.userService.getUserById(id).then((res)=>{
            console.log(res)
            this.current_user=res;
            if (res.adresse.country) {
                // this.getProviderStats();
                // this.getProviderSkills();
                this.getCountryOfManager(id);
            }
        }).catch((err)=>{console.log(err)})
    }

    async getProviderStats() {
        this.options.months = this.getSelectedMonthNumbers();
        this.chartData.data = this.chartData.labels = [];
        this.providerService.getProviderStatistics(this.options).subscribe((result: any)=>{
            this.data = result.data;
            if( result.data){ 
                this.data =  result.data;
                console.log(result.data)
                this.chartData.data = result.data.map(item => item.count);
                this.chartData.labels = result.data.map(item => item._id.month+"-"+item._id.year);
            } 
            console.log(this.chartData)
        }, (error)=>{
            console.error('Error fetching company:', error);
        })
    }
    async getProviderSkills() {
        this.skillsData.data = this.skillsData.labels = [];
        // console.log("AAAAAAA");
        // console.log(this.options);
        // console.log("BBBBBBBBBB");
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
    async getSumCountryProviders(country_id: string) {
        // this.skillsData.data = this.skillsData.labels = [];
        this.countryManagementService.getSumCountryProviders(country_id).subscribe((result: any)=>{
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
    }

}
