import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import * as $ from 'jquery';
import { GeneraleService } from '../../../../shared/service/generale/generale.service';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';

export interface ServiceOffered {
  name: string;
  vehicules: Vehicule[];
}

export interface City {
  name: string;
}

export interface DocumentPerso {
  name: string;
  description: string;
}



export interface Country {
  uuid: string;
  name: string;
  cities: City[];
}

export interface ItemeFile {
  idVehicule: number;
  id: number;
  name: string;
}

export interface Vehicule {
  id: number;
  name: string;
  saveIsVisible: boolean;
  itemFiles: ItemeFile[];
  /* make: string;
  model: string;
  year: string;
  mileage: string;
  typeService: string;
  files: any[]; */
}
@Component({
  selector: 'app-profile-normal-user',
  templateUrl: './profile-normal-user.component.html',
  styleUrls: ['./profile-normal-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileNormalUserComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;

  // elements de la tables tracking
  elementsTracking: any = [];
  previousTracking: any = [];
  headElementsTracking = ['DATA', 'REF CODE', 'CARRIER', 'STATUT', 'MESSAGE', 'LOCATION'];
  searchTextTracking = '';

  // elements de la tables transport of person
  elementsTransportOfPersons: any = [];
  previousTransportOfPersons: any = [];
  headElementsTransportOfPersons = ['PROVIDER', 'FROM', 'TO', 'DEPARTURE', 'CAR TYPE', 'COST/SEAT', 'NB SEATS'];

  // elements de la tables CARRIER
  elementsCarrierShipment: any = [];
  previousCarrierShipment: any = [];
  headElementsCarrierShipment = ['PROVIDER', 'FROM', 'TO', 'DEPARTURE', 'SERVICE TYPE', 'VOLUME', 'WEICHT'];


  panelOpenState = true;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  bikes: Vehicule[] = [];
  h2h: Vehicule[] = [];
  trucks: Vehicule[] = [];
  cars: Vehicule[] = [];

  
  // liste des services choisie avec les infos des vehicules
  serviceOffereds: ServiceOffered[] = [
    { name: 'BIKES', vehicules: this.bikes },
    { name: 'H2H', vehicules: this.h2h },
    { name: 'CARS', vehicules: this.cars },
    { name: 'TRUCKS', vehicules: this.trucks }
  ];


  // represente l liste des pays choisi avec leur villes
  countries: Country[] = [];

  // represente la liste de tout les pays avec leur ville
  allCountriesAndthierCities: Country[] = [];

  allCountriesData: any;

  // represente la liste des documents personnelles du user
  documents: DocumentPerso[] = [];

  // permet de savoir si on veux ajouter un document
  savePersoIsVisible = true;

  constructor(
    private cdRef: ChangeDetectorRef,
    private generalService: GeneraleService
  ) { }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our ServiceOffered
    if ((value || '').trim()) {
      const v: Vehicule[] = [];
      this.serviceOffereds.push({ name: value.trim(), vehicules: v });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  // remove and service
  remove(serviceOffered: ServiceOffered): void {
    const index = this.serviceOffereds.indexOf(serviceOffered);

    if (index >= 0) {
      this.serviceOffereds.splice(index, 1);
    }
  }


  // remove country
  removeCountry(country: Country): void {
    const index = this.countries.indexOf(country);

    if (index >= 0) {
      this.countries.splice(index, 1);
    }
  }

  removeCity(country: Country, city: City): void {
    const cities = country.cities;
    const index = cities.indexOf(city);
    if (index >= 0) {
      cities.splice(index, 1);
    }
  }


  ngOnInit() {
    this.initAllCountries();
    this.initAllCountriesAndThierCities();
    this.initTableTracking();
    this.initTableTransportOfPersons();
    this.initTableCarrierShipment();
    this.loadData();
  }

  // recupere de maniere brute la liste des pays
  initAllCountries() {
    this.generalService.getAllCountriesEn().then(cou => {
      this.allCountriesData = cou.data;
    }).catch(error => {
      this.allCountriesData = [];
    });
  }

  // initialise la liste des pays avec leur villes
  initAllCountriesAndThierCities() {
    /* let data: Country;
    let countryName;
    let uuidCountry;
    let citiesOfCountry: City[] = [];
    this.allCountriesData.forEach(element => {
      countryName = element.attributes.name;
      uuidCountry = element.attributes.uuid;
      // recuperation des ville du pays
      this.generalService.citiesOfCountry(countryName).forEach(cityName => {
        citiesOfCountry.push({ name: cityName });
      });
      // ajout des pays
      data = {
        uuid: uuidCountry,
        name: countryName,
        cities: citiesOfCountry
      };
      this.allCountriesAndthierCities.push(data);
      citiesOfCountry = [];
    });
    console.log(this.allCountriesAndthierCities); */
  }

  // add city in country
  addCityOfCountry(country: Country) {
    country.cities.push({ name: 'new city' });
  }

  // add country
  addCountry() {
    const country: Country = {
      uuid: '',
      name: 'New country',
      cities: []
    };
    this.countries.push(country);
  }


  // add a service
  addService() {
    const serviceOf: ServiceOffered = {
      name: 'New service',
      vehicules: []
    };
    this.serviceOffereds.push(serviceOf);
  }

  // add item document
  addDocument(idVeh: number, typeOfService: string) {
    switch (typeOfService) {
      case 'BIKES':
        this.bikes.forEach(vehicule => {
          if (vehicule.id === idVeh) {
            vehicule.saveIsVisible = false;
          }
        });
        break;
      case 'H2H':
        this.h2h.forEach(vehicule => {
          if (vehicule.id === idVeh) {
            vehicule.saveIsVisible = false;
          }
        });
        break;
      case 'CARS':
        this.cars.forEach(vehicule => {
          if (vehicule.id === idVeh) {
            vehicule.saveIsVisible = false;
          }
        });
        break;
      case 'TRUCKS':
        this.trucks.forEach(vehicule => {
          if (vehicule.id === idVeh) {
            vehicule.saveIsVisible = false;
          }
        });
        break;
      default:
        break;
    }
  }

  // save a document
  saveDocument(idVeh: number, typeOfService: string) {
    let countFile;
    switch (typeOfService) {
      case 'BIKES':
        this.bikes.forEach(vehicule => {
          if (vehicule.id === idVeh) {
            countFile = vehicule.itemFiles.length;
            vehicule.saveIsVisible = true;
            vehicule.itemFiles.push({
              idVehicule: idVeh,
              id: countFile,
              name: 'FileName' + countFile + '    BIKE ' + idVeh
            });
          }
        });
        break;
      case 'H2H':
        this.h2h.forEach(vehicule => {
          if (vehicule.id === idVeh) {
            countFile = vehicule.itemFiles.length;
            vehicule.saveIsVisible = true;
            vehicule.itemFiles.push({
              idVehicule: idVeh,
              id: countFile,
              name: 'FileName' + countFile + '    H2H ' + idVeh
            });
          }
        });
        break;
      case 'CARS':
        this.cars.forEach(vehicule => {
          if (vehicule.id === idVeh) {
            countFile = vehicule.itemFiles.length;
            vehicule.saveIsVisible = true;
            vehicule.itemFiles.push({
              idVehicule: idVeh,
              id: countFile,
              name: 'FileName' + countFile + '    CARS ' + idVeh
            });
          }
        });
        break;
      case 'TRUCKS':
        this.trucks.forEach(vehicule => {
          if (vehicule.id === idVeh) {
            countFile = vehicule.itemFiles.length;
            vehicule.saveIsVisible = true;
            vehicule.itemFiles.push({
              idVehicule: idVeh,
              id: countFile,
              name: 'FileName' + countFile + '    TRUCKS ' + idVeh
            });
          }
        });
        break;
      default:
        break;
    }
  }

  // add a vehicule
  addVehicule(typeOfService: string) {
    let nbre;
    let items;
    let vehi;
    switch (typeOfService) {
      case 'BIKES':
        nbre = this.bikes.length;
        items = [];
        vehi = { id: nbre, name: 'BIKE ' + nbre + ' / Name ' + nbre, saveIsVisible: true, itemFiles: items };
        this.bikes.push(vehi);
        break;
      case 'H2H':
        nbre = this.h2h.length;
        items = [];
        vehi = { id: nbre, name: 'H2H ' + nbre + ' / Name ' + nbre, saveIsVisible: true, itemFiles: items };
        this.h2h.push(vehi);
        break;
      case 'CARS':
        nbre = this.cars.length;
        items = [];
        vehi = { id: nbre, name: 'CARS ' + nbre + ' / Name ' + nbre, saveIsVisible: true, itemFiles: items };
        this.cars.push(vehi);
        break;
      case 'TRUCKS':
        nbre = this.trucks.length;
        items = [];
        vehi = { id: nbre, name: 'TRUCKS ' + nbre + ' / Name ' + nbre, saveIsVisible: true, itemFiles: items };
        this.trucks.push(vehi);
        break;
      default:
        break;
    }
  }


  // add  document perso
  addPersonalDocument() {
    this.savePersoIsVisible = false;
  }

  // add  document perso
  savePersonalDocument() {
    const document: DocumentPerso = { name: 'document name', description: 'document description' };
    this.documents.push(document);
    this.savePersoIsVisible = true;
  }





  // TABLES

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  // initialisation du tracking 1
  initTableTracking() {
    for (let i = 1; i <= 15; i++) {
      this.elementsTracking.push({
        col1: 'tacking' + i,
        col2: 'tacking',
        col3: 'tacking ',
        col4: 'tacking ',
        col5: 'tacking ',
        col6: 'tacking '
      });
    }
  }

  // initialisation du tableau transport of persons
  initTableTransportOfPersons() {
    for (let i = 1; i <= 15; i++) {
      this.elementsTransportOfPersons.push({
        col1: 'Transport' + i,
        col2: 'Transport',
        col3: 'Transport ',
        col4: 'Transport ',
        col5: 'Transport ',
        col6: 'Transport ',
        col7: 'Transport '
      });
    }
  }

  // initialisation du tableau carrier
  initTableCarrierShipment() {
    for (let i = 1; i <= 15; i++) {
      this.elementsCarrierShipment.push({
        col1: 'Carrier' + i,
        col2: 'Carrier',
        col3: 'Carrier ',
        col4: 'Carrier ',
        col5: 'Carrier ',
        col6: 'Carrier ',
        col7: 'Carrier '
      });
    }
  }

  // chargemnt des tables
  loadData() {

    // tracking
    this.mdbTable.setDataSource(this.elementsTracking);
    this.elementsTracking = this.mdbTable.getDataSource();
    this.previousTracking = this.mdbTable.getDataSource();

    // transport of persons
    this.mdbTable.setDataSource(this.elementsTransportOfPersons);
    this.elementsTransportOfPersons = this.mdbTable.getDataSource();
    this.previousTransportOfPersons = this.mdbTable.getDataSource();

    // carrier
    this.mdbTable.setDataSource(this.elementsCarrierShipment);
    this.elementsCarrierShipment = this.mdbTable.getDataSource();
    this.previousCarrierShipment = this.mdbTable.getDataSource();
  }

  @HostListener('input') oninput() {
    this.searchItems();
  }

  // filtre
  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchTextTracking) {
      this.mdbTable.setDataSource(this.previousTracking);
      this.elementsTracking = this.mdbTable.getDataSource();
    }

    if (this.searchTextTracking) {
      this.elementsTracking = this.mdbTable.searchLocalDataBy(this.searchTextTracking);
      this.mdbTable.setDataSource(prev);
    }
  }

}
