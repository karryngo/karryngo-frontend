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


@Component({
    selector: 'app-m-service-statistics',
    templateUrl: './m-service-statistics.component.html',
    styleUrls: ['./m-service-statistics.component.css']
})
export class MServiceStatisticsComponent implements OnInit {
    
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

    constructor(
        private authService:AuthService,
        private userService:UserService,
        private fb: FormBuilder,
        private serviceManagement: ServiceManagementService,
        private translate: TranslateService,
        private locationService:LocationService,
    ) {

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
        this.getServiceStatistics();

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

    ngOnInit(): void {
        this.createChart();
        this.servs$.subscribe((services: any) => {
            // Do something with the services array
            console.log('Services:', services);
            this.servs = services;
        });
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

    selectAllOptions(event): void {
        
        console.log(this.servs)
        console.log(this.selectedValue)
        // console.log(event)
        if (this.servs.length != this.selectedToppings.length) {
            // If selected, set all other options as selected
            // allServices.setValue([...this.servs$.value.map((service: any) => service.value)]);
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
            // allServices.setValue([...this.servs.map((service: any) => service.value)]);
            this.selectedToppings = [...this.servs.map((service: any) => service.value)];
        } else {
            // If unselected, clear all selected options
            console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
            // allServices.setValue([]);
            this.selectedToppings = [];
        }
    
        // const allServices = this.searchForm.get('type') as any;
        // if (event.isUserInput) {
        //     // Check if "Select All" is selected
        //     console.log("AAAAAAAAAAAAAAAAA")
        //     if (allServices.value.includes('selectAll')) {
        //         // If selected, set all other options as selected
        //         // allServices.setValue([...this.servs$.value.map((service: any) => service.value)]);
        //         allServices.setValue([...services.map((service: any) => service.value)]);
        //     } else {
        //         // If unselected, clear all selected options
        //         allServices.setValue([]);
        //     }
        // }
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
            // console.log(res)
            this.current_user=res;
            // if (res.adresse.country) {
            //     console.log(this.searchForm)
            //     // this.getServiceStatistics();
            // }
        }).catch((err)=>{console.log(err)}) 
    }

    getServiceStatistics() {
        this.searchForm.patchValue({
            displayMode: Number(this.searchForm.value.displayMode)
        });
        this.serviceManagement.getServiceStatistics(this.searchForm.value).subscribe((res)=>{
            // console.log(res)
            if(res.result){ 
                this.data = res.result;
                console.log(this.data)
                this.makeData(res.result)
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
                        label: "Number of Services",
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
    }

    makeData(realData: any){
        // Extracting labels and datasets from real data
        let labels;
        if(this.searchForm.get('displayMode').value==1) labels = realData.map(item => `${item._id.year}-${item._id.month}-${item._id.day} ${item._id.title?item._id.title:""}`);
        if(this.searchForm.get('displayMode').value==2) labels = realData.map(item => `${item._id.year}-${item._id.week} ${item._id.title?item._id.title:""}`);
        if(this.searchForm.get('displayMode').value==3) labels = realData.map(item => `${item._id.year}-${item._id.month} ${item._id.title?item._id.title:""}`);
        // if(this.searchForm.get('type').value.length!=0) labels = realData.map(item => `${item._id.title}`);
        // if(this.searchForm.get('displayMode').value=="Daily") labels = realData.map(item => `${item._id.year}-${item._id.month}-${item._id.day}`);
        let totalSuggestedPriceData = realData.map(item => item.count);
        // let averageSuggestedPriceData = realData.map(item => item.averageSuggestedPrice);
        // let countData = realData.map(item => item.count);

        // Update the chart data
        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = totalSuggestedPriceData;
        // this.chart.data.datasets[1].data = averageSuggestedPriceData;
        // this.chart.data.datasets[2].data = countData;

        // Update the chart
        this.chart.update();
    }

}
