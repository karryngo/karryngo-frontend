import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ParametersService } from '../../../shared/parameters/parameters.service';

@Injectable({
  providedIn: 'root'
})
export class GeneraleService {

  constructor(
    private api: ApiService,
    private parameters: ParametersService
  ) { }

  // permet de recuperer toutes les occurences d'une entite quelconque
  getAllElement(element: string): Promise<any> {
    const headers = {
      'Content-Type': 'application/hal+json',
      'Accept': 'application/json'
    };

    return new Promise((resolve, reject) => {
      this.api.get('jsonapi/taxonomy_term/' + element + '?_format=hal_json', headers).subscribe(success => {
        resolve(success);
      }, error => {
        reject(error);
      });
    });
  }

  // touts les pays en anglais
  getAllCountriesEn(): Promise<any> {
    return this.getAllElement(this.parameters.allCountriesEn);
  }

  // touts les pays en farncais
  getAllCountriesFr(): Promise<any> {
    return this.getAllElement(this.parameters.allCountriesFr);
  }

  // toutes les langues du systeme
  getAllLanguage(): Promise<any> {
    return this.getAllElement(this.parameters.allLanguage);
  }

  // touts les types de services du systeme
  getAllTypeOfService(): Promise<any> {
    return this.getAllElement(this.parameters.allTypeOfSErvice);
  }

  // permet de save une image
  saveImageFile(token: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/hal+json',
        'Accept': 'application/json',
        'X-CSRF-Token': 'Nr9nsDXPcTIk3bqDGb2K93KLaRe_z5kH7htvDy81xSc' || JSON.parse(localStorage.getItem('app-token'))
      }
      const params = {
        'data': {
          'type': 'file--image',
          'attributes': {
            // ceci Base 64 Encoded Image représente l'image codé en Base64 et tu dois enlever la chaîne suivante "data:image/jpeg;base64" et mettre juste le code suivant ladite chaîne
            'data': data.data,
            // ici picture représente le nom du folder présent sur le serveur et file-name représente le nom du fichier (exemple: tonton.png). N.B: le nom du fichier est en un seul mot et doit contenir l'extension
            'uri': 'public://picture/' + data.fileName
          }

        }
      };
      this.api.post(`jsonapi/file/image?_format=hal_json`, JSON.stringify(params), headers).subscribe(success => {
        resolve(success);
      }, error => {
        reject(error);
      });
    });
  }

  // Permet d enregistrer les infos (File Name, Description, File) d un document personnel du user ou d'un vehicule
  saveDocumentInformation(token: string, data: any, entity: string): Promise<any> {
    let documentEntity;
    let targetId;
    switch (entity) {
      case this.parameters.user:
        documentEntity = 'documents_bike';
        targetId = 'documents';
        break;
      case this.parameters.bike:
        documentEntity = 'documents_bike';
        targetId = 'documents_bike';
        break;
      case this.parameters.car:
        documentEntity = 'documents_car';
        targetId = 'documents_car';
        break;
      case this.parameters.truck:
        documentEntity = 'documents_truck';
        targetId = 'documents_truck';
        break;
      default:
        documentEntity = 'documents_bike';
        targetId = 'documents';
        break;
    }

    return new Promise((resolve, reject) => {

      const headers = {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/hal+json',
        'Accept': 'application/json',
        'X-CSRF-Token': 'L37xETNIYg_slJIQMKlJIti9b5uwdOmKaP_lOnnq4hE' || JSON.parse(localStorage.getItem('app-token'))
      }
      const cheminUrl = `${this.api.url}/rest/type/node/${documentEntity}`;
      const params = {
        '_links': {
          'type': {
            'href': cheminUrl
          }
        },
        // représente le nom du fichier (fIle name)
        'title': [
          {
            'value': data.title
          }
        ],
        'field_file_name': [{ 'value': data.field_file_name }],
        'field_file_description': [{ 'value': data.field_file_description }],
        'field_file': [
          {
            '_links': {
              'type': {
                'href': 'http://dev.sdkgames.com/karryngo/rest/type/file/file'
              }
            },
            // représente l'uuid du document obtenu à partir du numéro 17
            'uuid': [
              {
                'value': data.uuid
              }
            ]
          }
        ],
        'type': [
          {
            'target_id': targetId
          }
        ]
      };
      this.api.post(`entity/node?_format=hal_json`, JSON.stringify(params), headers).subscribe(success => {
        resolve(success);
      }, error => {
        reject(error);
      });
    });
  }

  // Permet de get le fichier pdf d un document
  getPdfDocumnent(documentId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.get(`jsonapi/file/image/${documentId}`).subscribe(success => {
        resolve(success);
      }, error => {
        reject(error);
      });
    });
  }


  // retourne la liste des villes d'un pays
  citiesOfCountry(countryName: string) {
    const cities = ['Ville1', 'Ville2', 'Ville3'];
    return cities;
  }

}




