import { Entity } from "./entity";
import { Zone as Location, Document, Vehicle } from './provider'

export enum RentalState {
    SERVICE_INIT_STATE = "service_init_STATE",
    SERVICE_IN_DISCUSS_STATE = "service_in_discuss_state",
    SERVICE_IN_TRANSACTION_STATE = "service_in_transaction_state",
    SERICE_END = "service_end"
}


export class Rental extends Entity
{
    typeof: String = '';
    is_urgent: Boolean;
    images: String[];
    collection_address: String = "";
    description: String;
    date: String="";
    country: any = null; 
    country_id: string="";
    service_rate: any = null;
    code: String;
    date_rent: String="";
    return_date: String="";
    title: String="";
    suggestedPrice: String="";
    idRequester: string="";
    idSelectedProvider: string="";
    idSelectedTransaction: string="";
    providers: any[]=[];
    transactions: any[]=[];
    collection_place: Location;
    dep_place:any={};
    number_place: Number=1;
    carTypeList:Rental[]=[];
    state:RentalState=RentalState.SERVICE_INIT_STATE;


    constructor(
        id: string = '',
        is_urgent: Boolean = false,
        details: String = '',
        images: String[] = [],
    ) {
        super();
        this._id = id;
        this.is_urgent = is_urgent;
        this.description = details;
        this.images = images;
        //hydrate date iso 8601
        this.date = (new Date()).toISOString();

    }
  
    static hydrate(entity:Record<string,any>):Rental
    {
        let pac:Rental=new Rental();
        for(const key in entity)
        {
            Reflect.set(pac,key,entity[key]);
        }
        return pac;
    }
  }




// export class Rental {
//     field_id: string;
//     field_type: string;
//     field_name: string;
//     field_bran: string;
//     field_photo: any[];
//     field_placeNumber: string;
//     field_description: string;

//     type:String="";
  
//     static hydrate(entity:Record<string,any>):Rental
//     {
//         let pac:Rental=new Rental();
//         for(const key in entity)
//         {
//             Reflect.set(pac,key,entity[key]);
//         }
//         return pac;
//     }
//   }
  