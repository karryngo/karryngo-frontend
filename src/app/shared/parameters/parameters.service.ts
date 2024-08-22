import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {

  // public static countriesSystem: any;
  public static countriesCitiesSystem: any;
  allCountriesEn = 'countries';
  allCountriesFr = 'pays';
  allLanguage = 'language';
  allTypeOfSErvice = 'type_of_service';
  allModelBikes = 'model_bike';
  allModelCars = 'model_car';
  allModelTrucks = 'model_truck';
  bike = 'bike';
  car = 'car';
  truck = 'truck';
  user = 'user';
  allTypeId = 'id_type';

  constructor() { }
}
