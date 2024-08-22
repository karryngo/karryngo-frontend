import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { GeneraleService } from '../generale/generale.service';
import { ParametersService } from '../../../shared/parameters/parameters.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  params: any;
  constructor(
    private api: ApiService,
    private generalService: GeneraleService,
    private parameters: ParametersService
  ) { }

  // touts les differents modeles de bikes, cars ou de trucks
  getAllVehiculModel(vehiculType: string): Promise<any> {
    return this.generalService.getAllElement(vehiculType);
  }

  // permet d'enregistrer ou de modifier les vehicules du user
  addUpdateVehicul(vehiculType: string, nid: string, token: string, data: any): Promise<any> {

    return new Promise((resolve, reject) => {

      const headers = {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/hal+json',
        'Accept': 'application/json',
        'X-CSRF-Token': 'FWjJkOClVTMzyhEPEhz_OPR3PulweXUqi-NePcofKU8' || JSON.parse(localStorage.getItem('app-token'))
      }

      // ici on recupere les parametres en fonction du type de vehicule choisi
      const cheminUrl = `${this.api.url}/rest/type/user/user`;
      switch (vehiculType) {
        case this.parameters.bike:
          this.params = {
            '_links': {
              'type': {
                'href': cheminUrl
              }
            },
            '_embedded': {
              'http://dev.sdkgames.com/karryngo/rest/relation/user/user/field_bikes': data.field_vehicules || []
            }
          };
          break;
        case this.parameters.car:
          this.params = {
            '_links': {
              'type': {
                'href': cheminUrl
              }
            },
            '_embedded': {
              'http://dev.sdkgames.com/karryngo/rest/relation/user/user/field_cars': data.field_vehicules || []
            }
          };
          break;
        case this.parameters.truck:
          this.params = {
            '_links': {
              'type': {
                'href': cheminUrl
              }
            },
            '_embedded': {
              'http://dev.sdkgames.com/karryngo/rest/relation/user/user/field_trucks': data.field_vehicules || []
            }
          };
          break;
        default:
          this.params = {
            '_links': {
              'type': {
                'href': cheminUrl
              }
            },
            '_embedded': {
              'http://dev.sdkgames.com/karryngo/rest/relation/user/user/field_bikes': data.field_vehicules || []
            }
          };
          break;
      }
      this.api.patch(`user/${nid}?_format=hal_json`, JSON.stringify(this.params), headers).subscribe(success => {
        resolve(success);
      }, error => {
        reject(error);
      });
    });
  }


  // permet d'enregistrer les info sur un vehicule du user
  addInfoVehicul(token: string, data: any, vehiculType: string): Promise<any> {

    return new Promise((resolve, reject) => {

      const headers = {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/hal+json',
        'Accept': 'application/json',
        'X-CSRF-Token': 'FWjJkOClVTMzyhEPEhz_OPR3PulweXUqi-NePcofKU8' || JSON.parse(localStorage.getItem('app-token'))
      }

      const cheminUrl = `${this.api.url}/rest/type/node/${vehiculType}`;
      switch (vehiculType) {
        case this.parameters.bike:
          this.params = {
            '_links': {
              'type': {
                'href': cheminUrl
              }
            },
            'title': [{ 'value': data.title }],
            'field_make_bike': [{ 'value': data.field_make_bike }],
            'field_mileage': [{ 'value': data.field_mileage }],
            'field_year_of_commissioning_bike': [{ 'value': data.field_year_of_commissioning_bike }],
            'field_model_bike': [
              {
                '_links': {
                  'type': {
                    'href': 'http://dev.sdkgames.com/karryngo/rest/type/taxonomy_term/model_bike'
                  }
                },
                'uuid': [
                  {
                    'value': data.field_model_bike
                  }
                ]
              }
            ],
            'field_documents': data.field_documents || [],
            'field_images': data.field_images || [],
            'type': [
              {
                'target_id': vehiculType
              }
            ]
          };
          break;
        case this.parameters.car:
          this.params = {
            '_links': {
              'type': {
                'href': cheminUrl
              }
            },
            'title': [{ 'value': data.title }],
            'field_make_car': [{ 'value': data.field_make_car }],
            'field_mileage_car': [{ 'value': data.field_mileage_car }],
            'field_year_of_commissioning_car': [{ 'value': data.field_year_of_commissioning_car }],
            'field_model_car': [
              {
                '_links': {
                  'type': {
                    'href': 'http://dev.sdkgames.com/karryngo/rest/type/taxonomy_term/model_car'
                  }
                },
                'uuid': [
                  {
                    'value': data.field_model_car
                  }
                ]
              }
            ],
            'field_documents_car': data.field_documents_car || [],
            'field_images_car': data.field_images_car || [],
            'type': [
              {
                'target_id': vehiculType
              }
            ]
          };
          break;
        case this.parameters.truck:
          this.params = {
            '_links': {
              'type': {
                'href': cheminUrl
              }
            },
            'title': [{ 'value': data.title }],
            'field_make_truck': [{ 'value': data.field_make_truck }],
            'field_mileage_truck': [{ 'value': data.field_mileage_truck }],
            'field_year_of_commissioning_truck': [{ 'value': data.field_year_of_commissioning_truck }],
            'field_model_truck': [
              {
                '_links': {
                  'type': {
                    'href': 'http://dev.sdkgames.com/karryngo/rest/type/taxonomy_term/model_truck'
                  }
                },
                'uuid': [
                  {
                    'value': data.field_model_truck
                  }
                ]
              }
            ],
            'field_documents_truck': data.field_documents_truck || [],
            'field_images_truck': data.field_images_truck || [],
            'type': [
              {
                'target_id': vehiculType
              }
            ]
          };
          break;
        default:
          break;
      }
      this.api.post(`entity/node?_format=hal_json`, JSON.stringify(this.params), headers).subscribe(success => {
        resolve(success);
      }, error => {
        reject(error);
      });
    });
  }


  // permet d'enregistrer un document d'un vehicule
  addVehiculDocument(token: string, data: any): Promise<any> {

    return new Promise((resolve, reject) => {

      const headers = {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/hal+json'
      }

      const params = {
        '_links': {

          'type': {
            'href': `${this.api.url}/rest/type/file/image`
          }
        },
        'filename': [{ 'value': data.filename }],		// ici on mets le nom du fichier suivi de .pdf
        'filemime': [{ 'value': 'application/octet-stream' }], 		// ou "application/pdf"
        'data': [{ 'value': data.data }]		// on mets la valeur du fichier converti en base64
      };
      this.api.post(`entity/file?_format=hal_json`, JSON.stringify(params), headers).subscribe(success => {
        resolve(success);
      }, error => {
        reject(error);
      });
    });
  }

  // Permet de get les infos d'un document d'un vehicule
  getVehiculeDocumentInfo(vehiculType: string, uuid: string): Promise<any> {
    let document_type;
    switch (vehiculType) {
      case this.parameters.bike:
        document_type = 'documents_bike';
        break;
      case this.parameters.car:
        document_type = 'documents_car';
        break;
      case this.parameters.truck:
        document_type = 'documents_truck';
        break;
      default:
        document_type = 'documents_bike';
        break;
    }

    return new Promise((resolve, reject) => {
      this.api.get(`jsonapi/node/${document_type}/${uuid}`).subscribe(success => {
        resolve(success);
      }, error => {
        reject(error);
      });
    });
  }

}
