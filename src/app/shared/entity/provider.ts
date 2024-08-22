import { Entity } from './entity';

export enum AccountType {
    SUPER_ADMIN_ACCOUNT="super_admin",
    CUSTOMER_ACCOUNT="customer",
    MANAGER_ACCOUNT="admin_manager",
    UNKNOW_ACCOUNT="unknow"
}

export class Address extends Entity 
{
    public email:string="";
    public mobilePhone:string="";
    public phone:string="";
    public websiteLink:string="";
    public whatsAppNumber:string="";
    public skypeNumber:string="";
    public zip:string="";
    public country:string=""
    public country_id:string=""
    public city:string="";
    public address:string="";
} 

export class Zone extends Entity
{
    long:number=0;
    lat:number=0;
    name:string="";
    country:string="";
    city:string="";
    // address:string = "";
    
    getStringZone():string
    {
        return `${this.city}, ${this.country}`;
    }
}

export class Vehicle extends Entity
{
    type:string="";
    name:string="";
    marque:string="";
    description:string="";
    plate_number:string="";
    placeNumbler:number;
    photo:string []=[]; 
    getStringVehicle():string
    {
        return `${this.type}:${this.marque}`
    }
}

export class ServiceOfProvider extends Entity
{
    title:string="";
    name:string="";
    description:string="";
    providerId:string="";
    zones:Zone[]=[];
    vehicles:Vehicle[]=[];
    documents:Document[]=[];
    services: String[]=[];
    addressForVerification:Address[]=[];

     hydrate(entity:Record<string,any>)
    {
        for(const key in entity)
        {
            if(key=="zones" && entity[key]!=null && entity[key]!=undefined) 
            {
                this.zones=entity[key].map(zone=>{
                    let z:Zone = new Zone();
                    z.hydrate(zone)
                    return z;
                });                
            }
            if(key=="vehicles" && entity[key]!=null && entity[key]!=undefined) 
            {
                this.vehicles=entity[key].map(vehilcle=>{
                    let v:Vehicle = new Vehicle();
                    v.hydrate(vehilcle);
                    return v;
                });
            }
            if(key=="addressForVerification" && entity[key]!=null && entity[key]!=undefined) 
            {
                this.addressForVerification=entity[key].map(add=>{
                    let a:Address = new Address();
                    a.hydrate(add);
                    return a;
                });
            }
            // if(key=="documents" && entity[key]!=null && entity[key]!=undefined) 
            // {
            //     this.documents=entity[key].map(doc=>{
            //         let d:Document = new Document();
            //         d.hydrate(doc);
            //         return d;
            //     });
            // }
            else Reflect.set(this,key,entity[key]);
        }
    }

    getLocationString():string
    {
        return this.zones.map((zone:Zone)=> `${zone.city}, ${zone.country}`)
        .reduce((previous:string,current:string)=>`${previous}; ${current}`,"")
    }
    getVehiculeString():string
    {
        return this.vehicles.map((vehicle:Vehicle)=> vehicle.getStringVehicle()).reduce((previous:string,current:string)=>`${previous}; ${current}`,"")
    }
}

export class User extends Entity
{
    /**
     * @description nom de l'utilisateur
     * @type String
     */
    public firstname:string="";

    /**
     * @description prenom de l'utilisateur
     * @type String
     */
    public lastname:string="";

    public language:string="";
    public sex:string="";

    public picture:any="";

    /**
     * @description mot de passe de l'utilisateur
     * @type String
     */
    public password:string="";

    public accountType:string = AccountType.CUSTOMER_ACCOUNT;

    public privileges: String[]= [];

    /**
     * @description adresses de l'utilisateur. peut contenir une adresse email, whatsapp,...
     * @type Address
     */
    public adresse:Address=new Address();


    public username:string="";
    public about:string="";

    hydrate(entity:Record<string,any>)
    {
        for(const key in entity)
        {

            if(key=="address" && entity[key]!=null && entity[key]!=undefined) 
            {
                this.adresse.hydrate(entity[key]);     
            }
            else if(Reflect.has(this,key)) Reflect.set(this,key,entity[key]);
            
        }
    }
    public getSimpleName():string
    {
        return `${this.firstname} ${this.lastname}`;
    }
    toString():Record<string | number,any>
    {
        let r=super.toString();
        r['adress']=this.adresse.toString();
        delete r["adresse"];
        return r;
    }
}

export class Provider extends User
{
    companyName:string="";
    registrationNumber:string="";
    importExportCompagnyCode:string="";    
    isAcceptedProvider:boolean=false;
    companyAddress:string="";
    isProvider:boolean=false;
    isCompany:boolean=false;
    passportNumber:string="";
    account_activated:string="";
    location: any = null;

    services: String[]=[];
    vehicles:Vehicle[]=[];
    documents:Document[]=[];
}

export class Document extends Entity
{
    name:string="";
    lastModified:string="";
    size:number=0.0;
    type:string="";
    data:any="";
    link:String="";
}

export class Offer extends Entity
{
    title:string="";
    provider_id:string="";
    description:string="";
    departure_date:string="";
    departure_time:string="";
    departure_place:string="";
    arrival_place:string="";
    geo: any= null;
    status: string= null;
    weight: number= 0;
    latitude: number= null;
    longitude: number= null;
    history: any[]=[];

     hydrate(entity:Record<string,any>)
    {
        for(const key in entity)
        {
            Reflect.set(this,key,entity[key]);
        }
    }

}