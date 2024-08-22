import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import * as $ from 'jquery';
import { GeneraleService } from '../../../../shared/service/generale/generale.service';

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
  selector: 'app-profile-carrier',
  templateUrl: './profile-carrier.component.html',
  styleUrls: ['./profile-carrier.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileCarrierComponent implements OnInit {
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

}
