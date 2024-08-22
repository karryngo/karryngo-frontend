import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/service/auth/auth.service';
import { UserService } from '../../../../shared/service/user/user.service';
import { Provider } from '../../../../shared/entity/provider';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceManagementService } from '../../../../shared/service/back-office/service-management.service';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import services from '../../../../../assets/data/service.json';
import * as Chart from 'chart.js';
import { MatOptionSelectionChange } from '@angular/material/core';
import { __spreadArray } from 'tslib';
import { MatSelectChange } from '@angular/material/select';
import { LocationService } from '../../../../shared/service/location/location.service';

class Card {
    data: any [] = [];
    constructor(data){
        this.data.push
    }
}

@Component({
    selector: 'app-m-service-statistics',
    templateUrl: './m-service-statistics.component.html',
    styleUrls: ['./m-service-statistics.component.css']
})
export class MServiceStatisticsComponent implements OnInit {

    // public chartData = {
    //     labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
    //     data: [12, 19, 3, 5, 2]
    // };
    public chartData = { labels: [], data: [] };
    public totalData = { labels: [], data: [], type: "" };
    public revenueData = { labels: [], data: [] };
    
    months: { name: string, number: number }[] = [
        { name: 'Jan', number: 1 },
        { name: 'Feb', number: 2 },
        { name: 'Mar', number: 3 },
        { name: 'Apr', number: 4 },
        { name: 'May', number: 5 },
        { name: 'Jun', number: 6 },
        { name: 'Jul', number: 7 },
        { name: 'Aug', number: 8 },
        { name: 'Sep', number: 9 },
        { name: 'Oct', number: 10 },
        { name: 'Nov', number: 11 },
        { name: 'Dec', number: 12 }
    ];
    chart4: any;
    countCard1: any[] = [];
    countCard11 = [
        { count: 2208, label: 'Total Sales' },
        { count: 21, label: 'Delivery' },
        { count: 10, label: 'Lift' },
        { count: 15, label: 'Rentals' },
    ];
    countCard2: any[] = [];
    countCard21 = [
        { count: 2208, label: 'Average Daily Delivery' },
        { count: 21, label: 'Average Daily Volume' },
        { count: 10, label: 'Average Daily Sales' },
    ];
    countCard3 :  { count: number, label: string } [];





    current_user: Provider;
    searchForm: FormGroup;

    selectedToppings = [];
    servs$: Observable<any>;
    servs: any[];
    service_colis = services;
    service_trip = services;
    data: any = [];
    selectedValue: any = [];
    mode: string[] = ["All", "Daily", "Weekly", "Monthly", "Yearly"];

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

    countries: any = [];
    currency: string = "";
    allowedYears: number[] = [];
    selectedYear: number;
    selectedMonth: number | null = null; // Property to track selected month
    // selectedCity: string | null = null;
    selectedCountry: string | null = null;
    options: {year: number, country: string, month: number} = { year: null, country: null, month: null };
    totalRevenueData: any = [];

    constructor(
        private authService:AuthService,
        private userService:UserService,
        private fb: FormBuilder,
        private serviceManagement: ServiceManagementService,
        private translate: TranslateService,
        private locationService:LocationService,
    ) {
        this.getTotalStatistics();
        this.setYear();
        const currentDate = new Date();
        const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
        this.searchForm = this.fb.group({
            fromDate: [this.formatDate(firstDayOfYear)],
            toDate: [this.formatDate(currentDate)],
            sort: ['1'], // Default sort value is 1
            displayMode: [0],
            country_id: [''],
            type: [[]]
        });
        // this.getServiceStatistics();

        this.authService.currentUserSubject.subscribe((user:any)=>{
            console.log(user)
            if (user._id && user._is!="") {
                this.getUserById(user._id);
            }
        })
        this.getServiceTypes();
        this.translate.onLangChange.subscribe(() => {
            this.getServiceTypes()
        });
    }

    async ngOnInit() {
        this.servs$.subscribe((services: any) => {
            this.servs = services;
        });
        await this.get_countries();
        this.searchForm.get('country_id').setValue('');
        
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
        this.getServiceStatistics();
    }
    onCountryClicked(country: string): void {
        if (this.selectedCountry === country) {
            this.selectedCountry = this.options.country = null;
        }else {
            this.selectedCountry = this.options.country = country;
        }
        this.getServiceStatistics();
    }
    onMonthClicked(month: number): void {
        if (this.selectedMonth === month) {
            this.selectedMonth = this.options.month = null;
        } else {
            this.selectedMonth = this.options.month = month;
        }
        this.getServiceStatistics();
    }

    get_countries(){
        this.locationService.get_all_countries()
        .then((res) => {
            console.log(res);
            this.countries = res.result; 
            this.selectedCountry = this.options.country = res.result[3]?._id;
            this.getServiceStatistics();
        })
    }

    selectAllOptions(event): void {
        console.log(this.servs)
        console.log(this.selectedValue)
        // console.log(event)
        if (this.servs.length != this.selectedToppings.length) {
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
            this.selectedToppings = [...this.servs.map((service: any) => service.value)];
        } else {
            console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
            // allServices.setValue([]);
            this.selectedToppings = [];
        }
    }
    onSelectionChange(event: MatSelectChange): void {
        this.selectedValue = event.value;
        console.log('Selected Value:', this.selectedValue);
        // console.log('Selected Value:', this.selectedToppings);
      
    }

    getServiceTypes(){
        // Define the translation keys
        const keys = ['services.TRANSPORTER', 'services.PERSONS'];

        // Use forkJoin to fetch translations for all keys
        const translationObservables: Observable<any>[] = keys.map(key => this.translate.get(key));
        const mergedTranslations$ = forkJoin(translationObservables);

        // Use switchMap to combine translations with respective services
        this.servs$ = mergedTranslations$.pipe(
            map((translationsList: any[]) => {
                let i = 0;
                const transporterServices = this.service_colis.TRANSPORTER.map((service: string) => {
                const translatedName = translationsList[0][i];
                // console.log(translatedName);
                // console.log(service);
                i++;
                return {
                    name: translatedName,
                    value: service
                };
                });

                i = 0; // Reset i for the next set of services
                const personsServices = this.service_trip.PERSONS.map((service: string) => {
                const translatedName = translationsList[1][i];
                // console.log(translatedName);
                // console.log(service);
                i++;
                return {
                    name: translatedName,
                    value: service
                };
                });

                // Combine both sets of services into a single array
                return transporterServices.concat(personsServices);
            })
        );
    }

    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }

    getUserById(id: string){
        this.userService.getUserById(id).then((res)=>{
            this.current_user=res;
        }).catch((err)=>{console.log(err)}) 
    }

    getServiceStatistics() {
        this.chartData.data = this.chartData.labels = [];
        this.serviceManagement.getServiceStats(this.options).subscribe((res)=>{
            if(res.result){ 
                this.data = res.result;
                console.log(this.data)
                this.chartData.data = res.result.services.map(item => item.count);
                this.chartData.labels = res.result.services.map(item => item._id.type);
                this.countCard1 = res.result.services.map(item => ({count: item.count, label: item._id.type, currency: item.currency.symbol}));
                this.countCard2 = res.result.services.map(item => ({count: item.averageSuggestedPrice.toFixed(2)+" "+item.currency.symbol, label: "AVG Price | "+item._id.type}));
                this.countCard3 = this.setData(res.result);
                console.log(this.countCard1)
            } else {
                this.chartData.data = this.chartData.labels = [];
                this.countCard1 = this.countCard2 = this.countCard3 = [];
            }
        }, (error)=>{
            console.log(error)
        })
    }

    setData(data: {totalRevenue: number, totalServices: number, totalSuggestedPrice: number, averageSuggestedPrice: number, services: any[]}): any[]{
        let res: any[] = [];
        res.push({ count: data.totalServices, label: 'Total Services' })
        res.push({ count: data.totalRevenue.toFixed(2)+ " "+data.services[0]?.currency.symbol, label: 'Total Revenue' })
        res.push({ count: data.totalSuggestedPrice+ " "+data.services[0]?.currency.symbol, label: 'Total Suggested Price' })
        res.push({ count: data.averageSuggestedPrice.toFixed(2)+ " "+data.services[0]?.currency.symbol, label: 'average Suggested Price' })
        return res;
    }

    getTotalStatistics(){
        this.serviceManagement.getTotalStatistics().subscribe((res)=>{
            console.log(res)
            if(res.result){ 
                this.totalRevenueData = res.result;
                // this.totalData.push({data: res.result.map(item => item.totalServices), labels: res.result.map(item => item.code)});
                this.totalData.data = res.result.map(item => item.totalServices);
                this.totalData.labels = res.result.map(item => item.code);
                this.totalData.type = "Nb of services";
                // this.totalData.labels.push(res.result.services.map(item => item.code));

                this.revenueData.data = res.result.map(item => item.totalRevenue);
                this.revenueData.labels = res.result.map(item => item.code+"("+item.currency?.symbol+")");
                // console.log(this.totalData)
            } else {
            }
        }, (error)=>{
            console.log(error)
        })
    }

    getBackgroundClass(index: number) {
        const colors = ['bg-red', 'bg-blue', 'bg-green', 'bg-yellow']; // Define your background colors
        return colors[index % colors.length]; // Apply a different color for each iteration
    }
}
