import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/service/auth/auth.service';
import { CountryManagementService } from '../../../../shared/service/back-office/country-management.service';
import { UserService } from '../../../../shared/service/user/user.service';
import { Provider } from '../../../../shared/entity/provider';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Chart} from 'chart.js';
import service from '../../../../../assets/data/services.json'
import { Observable, forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import services from '../../../../../assets/data/service.json';
import { map } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material/select';

@Component({
    selector: 'app-m-country-statistics',
    templateUrl: './m-country-statistics.component.html',
    styleUrls: ['./m-country-statistics.component.css']
})
export class MCountryStatisticsComponent implements OnInit {

    current_user: Provider;
    data: any = [];

    selectedDate: Date;
    searchForm: FormGroup;
    type: string[] = [];
    service_trip = services;

    public chart: any  = new Chart("MyChart", {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: "Total Suggested Price",
                    data: [],
                    backgroundColor: 'blue'
                },
                {
                    label: "Average Suggested Price",
                    data: [],
                    backgroundColor: 'limegreen'
                },
                {
                    label: "Count",
                    data: [],
                    backgroundColor: 'red'
                }
            ]
        },
        options: {
            aspectRatio: 2.5
        }
    });
    mode: string[] = ["All", "Daily", "Weekly", "Monthly", "Yearly"];


    servs$: Observable<any>;
    service_colis = services;
    selected_types: string[] = [];
    selectedToppings = [];
    
    constructor(
        private countryManagementService: CountryManagementService,
        private userService:UserService,
        private authService:AuthService,
        private fb: FormBuilder,
        private translate: TranslateService,
    ) { 
        this.authService.currentUserSubject.subscribe((user:any)=>{
            console.log(user)
            if (user._id && user._is!="") {
                this.getUserById(user._id);
            }
            
        })

        // this.initService();
        // this.translate.onLangChange.subscribe(() => {
        //     let i: number = -1
        //     this.servs$ = this.translate.get('services.PERSONS').pipe(
        //         map((translations: any) => {
        //         return this.service_trip.PERSONS.map((service: string) => {
        //             i++;
        //             console.log(translations[i])
        //             console.log(service)
        //             return {
        //                 name: translations[i],
        //                 value: service
        //             };
        //         });
        //         })
        //     );
        // });
        this.getServiceTypes();
        this.translate.onLangChange.subscribe(() => {
            this.getServiceTypes()
        });
        
    }

    ngOnInit(): void {
        const currentDate = new Date();
        const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);

        this.searchForm = this.fb.group({
            fromDate: [this.formatDate(firstDayOfYear)],
            toDate: [this.formatDate(currentDate)],
            sort: ['1'], // Default sort value is 1
            displayMode: [0],
            type: [[]]
        });
        this.createChart();
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
            console.log(translatedName);
            console.log(service);
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
    handleType(ev: string){
        console.log(ev);
        // this.tripForm.patchValue({field_typeof: ev});
        // this.change_typeof = ev;
    }
    onSelectionChange(event: MatSelectChange): void {
        // const selectedValue = event.value;
        // console.log('Selected Value:', selectedValue);
        // console.log('Selected Value:', this.selectedToppings);
      
    }

    initService(){
        let i: number = -1
        this.servs$ = this.translate.get('services.PERSONS').pipe(
            map((translations: any) => {
                return this.service_trip.PERSONS.map((service: string) => {
                    i++;
                    console.log(translations[i])
                    console.log(service)
                    return {
                        name: translations[i],
                        value: service
                    };
                });
            })
        );
    }

    getUserById(id: string){
        this.userService.getUserById(id).then((res)=>{
            console.log(res)
            this.current_user=res;
            if (res.adresse.country) {
                console.log(this.searchForm.value)
                this.getServiceStats(res._id);
            }
        }).catch((err)=>{console.log(err)})
    }

    onSearch() {
        const fromDate = this.searchForm.get('fromDate').value;
        const toDate = this.searchForm.get('toDate').value;
        const sort = this.searchForm.get('sort').value;
        const displayMode = this.searchForm.get('displayMode').value;
        // this.searchForm.setValue({type: this.selectedToppings});
        console.log(this.searchForm.value)
        this.getServiceStats(this.current_user._id);
    
        // Now, you can use fromDate and toDate to make an API request
        // Implement your API request logic here
    } 

    private formatDate(date: Date): string {
        // Format the date to 'YYYY-MM-DD' for the input[type="date"]
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }

    getServiceStats(user_id: any) {
        this.searchForm.patchValue({
            displayMode: Number(this.searchForm.value.displayMode)
        });
        this.countryManagementService.getServiceStats(this.searchForm.value, user_id).subscribe((res)=>{
            console.log(res)
            if(res.data){ 
                this.data = res.data;
                console.log(this.data)
                this.makeData(res.data)
            }
        }, (error)=>{
            console.log(error)
        })
    }

    createChart(){
        if (this.chart) {
            this.chart.destroy(); 
        }
        this.chart = new Chart("MyChart", {
            type: 'bar',
            data: {
                labels: [],
                datasets: [
                    {
                        label: "Total Suggested Price",
                        data: [],
                        backgroundColor: 'blue'
                    },
                    {
                        label: "Average Suggested Price",
                        data: [],
                        backgroundColor: 'limegreen'
                    },
                    {
                        label: "Count",
                        data: [],
                        backgroundColor: 'red'
                    }
                ]
            },
            options: {
                aspectRatio: 2.5
            }
        });
    }

    makeData(realData: any){
        // Extracting labels and datasets from real data
        let labels;
        if(this.searchForm.get('displayMode').value=="Daily") labels = realData.map(item => `${item._id.year}-${item._id.month}-${item._id.day}`);
        if(this.searchForm.get('displayMode').value=="Weekly") labels = realData.map(item => `${item._id.year}-${item._id.week}`);
        if(this.searchForm.get('displayMode').value=="Monthly") labels = realData.map(item => `${item._id.year}-${item._id.month}`);
        // if(this.searchForm.get('displayMode').value=="Daily") labels = realData.map(item => `${item._id.year}-${item._id.month}-${item._id.day}`);
        let totalSuggestedPriceData = realData.map(item => item.totalSuggestedPrice);
        let averageSuggestedPriceData = realData.map(item => item.averageSuggestedPrice);
        let countData = realData.map(item => item.count);

        // Update the chart data
        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = totalSuggestedPriceData;
        this.chart.data.datasets[1].data = averageSuggestedPriceData;
        this.chart.data.datasets[2].data = countData;

        // Update the chart
        this.chart.update();
    }

}
