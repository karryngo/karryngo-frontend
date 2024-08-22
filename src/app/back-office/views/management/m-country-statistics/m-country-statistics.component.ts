import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/service/auth/auth.service';
import { CountryManagementService } from '../../../../shared/service/back-office/country-management.service';
import { UserService } from '../../../../shared/service/user/user.service';
import { Provider } from '../../../../shared/entity/provider';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import services from '../../../../../assets/data/service.json';
import { map } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material/select';
import { LocationService } from '../../../../shared/service/location/location.service';

@Component({
    selector: 'app-m-country-statistics',
    templateUrl: './m-country-statistics.component.html',
    styleUrls: ['./m-country-statistics.component.css']
})
export class MCountryStatisticsComponent implements OnInit {
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
    // searchForm: FormGroup;

    selectedToppings = [];
    servs$: Observable<any>;
    servs: any[];
    service_colis = services;
    service_trip = services;
    data: any = [];
    selectedValue: any = [];
    mode: string[] = ["All", "Daily", "Weekly", "Monthly", "Yearly"];

    public chart: any;

    // countries: any = [];
    currency: string = "";
    allowedYears: number[] = [];
    selectedYear: number;
    selectedMonth: number | null = null; // Property to track selected month
    // selectedCity: string | null = null;
    selectedCountry: string | null = null;
    options: {year: number, country: string, month: number} = { year: null, country: null, month: null };
    totalRevenueData: any = [];
    
    constructor(
        private countryManagementService: CountryManagementService,
        private userService:UserService,
        private authService:AuthService,
        private translate: TranslateService,
        private locationService:LocationService,
    ) { 
        this.setYear();
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
        // await this.get_countries();
        // this.searchForm.get('country_id').setValue('');
        
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
    // onCountryClicked(country: string): void {
    //     if (this.selectedCountry === country) {
    //         this.selectedCountry = this.options.country = null;
    //     }else {
    //         this.selectedCountry = this.options.country = country;
    //     }
    //     this.getServiceStatistics();
    // }
    onMonthClicked(month: number): void {
        if (this.selectedMonth === month) {
            this.selectedMonth = this.options.month = null;
        } else {
            this.selectedMonth = this.options.month = month;
        }
        this.getServiceStatistics();
    }

    // get_countries(){
    //     this.locationService.get_all_countries()
    //     .then((res) => {
    //         console.log(res);
    //         this.countries = res.result; 
    //         this.selectedCountry = this.options.country = res.result[3]?._id;
    //         this.getServiceStatistics();
    //     })
    // }

    selectAllOptions(event): void {
        console.log(this.servs)
        console.log(this.selectedValue)
        if (this.servs.length != this.selectedToppings.length) {
            this.selectedToppings = [...this.servs.map((service: any) => service.value)];
        } else {
            this.selectedToppings = [];
        }
    }
    onSelectionChange(event: MatSelectChange): void {
        this.selectedValue = event.value;
        console.log('Selected Value:', this.selectedValue);
      
    }

    getServiceTypes(){
        const keys = ['services.TRANSPORTER', 'services.PERSONS'];
        const translationObservables: Observable<any>[] = keys.map(key => this.translate.get(key));
        const mergedTranslations$ = forkJoin(translationObservables);
        this.servs$ = mergedTranslations$.pipe(
            map((translationsList: any[]) => {
                let i = 0;
                const transporterServices = this.service_colis.TRANSPORTER.map((service: string) => {
                const translatedName = translationsList[0][i];
                i++;
                return {
                    name: translatedName,
                    value: service
                };
                });

                i = 0; // Reset i for the next set of services
                const personsServices = this.service_trip.PERSONS.map((service: string) => {
                const translatedName = translationsList[1][i];
                i++;
                return {
                    name: translatedName,
                    value: service
                };
                });
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

    async getUserById(id: string){
        this.userService.getUserById(id).then(async (res)=>{
            this.current_user = await res;
            this.getServiceStatistics();
        }).catch((err)=>{console.log(err)}) 
    }

    getServiceStatistics() {
        this.chartData.data = this.chartData.labels = [];
        this.countryManagementService.getServiceStatistics(this.options, this.current_user._id).subscribe((res)=>{ 
            if(res.result){ 
                this.data = res.result;
                this.chartData.data = res.result.services.map(item => item.count);
                this.chartData.labels = res.result.services.map(item => item._id.type);
                this.countCard1 = res.result.services.map(item => ({count: item.count, label: item._id.type, currency: item.currency.symbol}));
                this.countCard2 = res.result.services.map(item => ({count: item.averageSuggestedPrice.toFixed(2)+" "+item.currency.symbol, label: "AVG Price | "+item._id.type}));
                this.countCard3 = this.setData(res.result);
                // console.log(this.countCard1)
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

    getBackgroundClass(index: number) {
        const colors = ['bg-red', 'bg-blue', 'bg-green', 'bg-yellow']; // Define your background colors
        return colors[index % colors.length]; // Apply a different color for each iteration
    }




































}
