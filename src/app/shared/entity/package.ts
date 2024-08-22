import { Entity, purgeAttribute } from './entity';
import { Zone as Location, Document, Vehicle } from './provider'

export enum PackageState {
    SERVICE_INIT_STATE = "service_init_STATE",
    SERVICE_IN_DISCUSS_STATE = "service_in_discuss_state",
    SERVICE_IN_TRANSACTION_STATE = "service_in_transaction_state",
    SERICE_END = "service_end"
}


// package representation
export class Package extends Entity {
    
    carTypeList:Vehicle[]=[];
    is_urgent:Boolean;
    description:String;
    departure_address:String;
    arrival_address:String;
    images:String[];
    from:Location;
    to:Location;
    date:String="";
    date_departure:String="";
    date_arrival:String="";
    title:String="";
    suggestedPrice:number=0;
    country: any;
    country_id: string="";
    service_rate: any;
    city: any;
    code: String;
    state:PackageState=PackageState.SERVICE_INIT_STATE;

    idRequester:string=""
    idSelectedProvider:string="";
    idSelectedTransaction:string="";
    providers:any[]=[];
    transactions:any[]=[];
    dep_place:any={};
    arr_place:any={};

    constructor(
        id: string = '',
        is_urgent: Boolean = false,
        details: String = '',
        departure_address: String = '',
        arrival_address: String = '',
        images: String[] = [],
        from: Location = new Location(),
        to: Location = new Location(),
    ) {
        super();
        this._id = id;
        this.is_urgent = is_urgent;
        this.description = details;
        this.departure_address = departure_address;
        this.arrival_address = arrival_address;
        this.images = images;
        this.from = from;
        this.to = to;

        //hydrate date iso 8601
        this.date = (new Date()).toISOString();

    }

    /**
     * @inheritdoc
     */
    hydrate(entity: any): void {
        let options = purgeAttribute(this, entity, 'options');
        this.is_urgent = purgeAttribute(this, options, 'is_urgent');
        this.description = purgeAttribute(this, options, 'description');
        this.images = purgeAttribute(this, entity, 'images');
        this.dep_place = purgeAttribute(this, entity, 'dep_place');
        this.departure_address = purgeAttribute(this, entity, 'departure_address');
        this.arrival_address = purgeAttribute(this, entity, 'arrival_address');
        this.arr_place = purgeAttribute(this, entity, 'arr_place');
        if (purgeAttribute(this, options, 'vehicle')) {
            this.carTypeList = purgeAttribute(this, options, 'vehicle').map((v: Record<string, any>) => {
                let veh: Vehicle = new Vehicle();
                veh.hydrate(v);
                return veh;
            });
        }

        // if (purgeAttribute(this, options, 'images')) {
        //     this.images = purgeAttribute(this, options, 'images').map((i: Record<string, any>) => {
        //         let img: Document = new Document();
        //         img.hydrate(i);
        //         return img;
        //     });
        // }

        this.suggestedPrice = purgeAttribute(this, entity, 'suggestedPrice');
        this.country = purgeAttribute(this, entity, 'country');
        this.country_id = purgeAttribute(this, entity, 'country_id');
        this.service_rate = purgeAttribute(this, entity, 'service_rate');
        this.city = purgeAttribute(this, entity, 'city');
        this.code = purgeAttribute(this, entity, 'code');

        let adresse = purgeAttribute(this, entity, 'address');
        this.from.hydrate(purgeAttribute(this, adresse, 'from'));

        this.to.hydrate(purgeAttribute(this, adresse, 'to'));

        let deadline = purgeAttribute(this, entity, 'deadline');
        if (deadline) {
            this.date_departure = purgeAttribute(this, deadline, 'departure');
            this.date_arrival = purgeAttribute(this, deadline, 'arrival');
        }
        this.date = purgeAttribute(this, entity, 'publicationDate') ? purgeAttribute(this, entity, 'publicationDate') : this.date;
        this.title = purgeAttribute(this, entity, 'title');
        this._id = purgeAttribute(this, entity, "_id");
        this.state = purgeAttribute(this, entity, "state");

        this.idRequester = purgeAttribute(this, entity, "idRequester");
        this.idSelectedProvider = purgeAttribute(this, entity, "idSelectedProvider");
        this.idSelectedTransaction = purgeAttribute(this, entity, "idSelectedTransaction");
        if (entity.providers) {
            this.providers = purgeAttribute(this, entity, "providers")
        }
        if (entity.transactions) {
            this.transactions = purgeAttribute(this, entity, "transactions")
        }
    }

    /**
     * @inheritdoc
     */
    toString(): any {
        return {
            id: this.id,
            address:
            {
                from: this.from.toString(),
                to: this.to.toString(),
            },
            publicationDate: this.date,
            deadline: {
                departure: this.date_departure,
                arrival: this.date_arrival
            },
            options: {
                vehicle: this.carTypeList.map((vehicle: Vehicle) => vehicle.toString()),
                is_urgent: this.is_urgent,
            },
            images: this.images,
            title: this.title,
            suggestedPrice: this.suggestedPrice,
            country: this.country,
            country_id: this.country_id,
            service_rate: this.service_rate,
            city: this.city,
            code: this.code,
            description: this.description,
            departure_address: this.departure_address,
            arrival_address: this.arrival_address,
            dep_place: this.dep_place,
            arr_place: this.arr_place,
            state: this.state,
            idRequester: this.idRequester,
            idSelectedProvider: this.idSelectedProvider,
            idSelectedTransaction: this.idSelectedTransaction,
            providers: this.providers,
            transactions: this.transactions
        };
        //stringify date format ISO 8601

    }
}

export class ColisPackage extends Package {
    static TYPE = 'TransportColisService';

    is_weak: Boolean = false;
    typeof: String = '';
    size_heigth: Number ;
    size_depth: Number ;
    size_width: Number ;
    size_piece_nber: Number = 0;
    latitude: Number = 0;
    longitude: Number = 0;
    size_piece_length: Number ;
    number_place: Number = 0;
    weight: Number = 0;
    package_name: String = '';
    receiver: ReceiverColis = new ReceiverColis();
    geo: any = null;
    inventory: any;

    hydrate(entity: any): void {

        let options = purgeAttribute(this, entity, 'options');
        this.is_weak = purgeAttribute(this, options, 'is_weak');
        this.typeof = purgeAttribute(this, options, 'typeof');
        this.geo = purgeAttribute(this, options, 'geo');
        this.package_name = purgeAttribute(this, options, 'package_name');
        this.number_place = purgeAttribute(this, options, 'field_numberPlace');
        this.inventory = purgeAttribute(this, entity, 'inventory');
        this.weight = purgeAttribute(this, options, 'weight');
        this.latitude = purgeAttribute(this, options, 'latitude');
        this.longitude = purgeAttribute(this, options, 'longitude');
        if (entity.hasOwnProperty('size')) {
            this.size_heigth = purgeAttribute(this, options.size, 'heigth');
            this.size_depth = purgeAttribute(this, options.size, 'depth');
            this.size_width = purgeAttribute(this, options.size, 'width');
            this.size_piece_nber = purgeAttribute(this, options.size, 'piece_nber');
            this.size_piece_nber = purgeAttribute(this, options.size, 'length');
        }
        if (entity.options.receiver) {
            this.receiver.hydrate(entity.options.receiver);
            this.receiver.id = this.receiver.id == null ? '' : this.receiver.id;
        }
        super.hydrate(entity)
    }

    /**
     * @inheritdoc
     */
    toString(): any {
        let stringifyO = super.toString();

        stringifyO['options'] = {
            ...stringifyO['options'],
            is_weak: this.is_weak,
            typeof: PackageTypeOf.COLIS,
            size: {
                heigth: this.size_heigth,
                depth: this.size_heigth,
                width: this.size_width,
                piece_nber: this.size_piece_nber,
                length: this.size_piece_length,
                weight: this.weight
            },
            package_name: this.package_name,
            receiver: this.receiver.toString()
        };
        stringifyO['inventory'] = this.inventory,
        stringifyO['type'] = ColisPackage.TYPE;
        stringifyO['geo'] = this.geo;
        return stringifyO;
    }
}

export class TravelPackage extends Package {
    static TYPE = 'TravelColisService';

    is_weak: Boolean = false;
    typeof: String = '';
    size_heigth: Number = 0.0;
    size_depth: Number = 0.0;
    size_width: Number = 0.0;
    size_piece_nber: Number = 0;
    latitude: Number = 0;
    longitude: Number = 0;
    size_piece_length: Number = 0;
    number_place: Number = 0;
    weight: Number = 0;
    package_name: String = '';
    receiver: ReceiverColis = new ReceiverColis();
    geo: any = null;

    hydrate(entity: any): void {

        let options = purgeAttribute(this, entity, 'options');
        this.is_weak = purgeAttribute(this, options, 'is_weak');
        this.typeof = purgeAttribute(this, options, 'typeof');
        this.geo = purgeAttribute(this, options, 'geo');
        this.package_name = purgeAttribute(this, options, 'package_name');
        this.number_place = purgeAttribute(this, options, 'field_numberPlace');
        this.weight = purgeAttribute(this, options, 'weight');
        this.latitude = purgeAttribute(this, options, 'latitude');
        this.longitude = purgeAttribute(this, options, 'longitude');
        if (entity.hasOwnProperty('size')) {
            this.size_heigth = purgeAttribute(this, options.size, 'heigth');
            this.size_depth = purgeAttribute(this, options.size, 'depth');
            this.size_width = purgeAttribute(this, options.size, 'width');
            this.size_piece_nber = purgeAttribute(this, options.size, 'piece_nber');
            this.size_piece_nber = purgeAttribute(this, options.size, 'length');
        }
        if (entity.options.receiver) {
            this.receiver.hydrate(entity.options.receiver);
            this.receiver.id = this.receiver.id == null ? '' : this.receiver.id;
        }
        super.hydrate(entity)
    }

    /**
     * @inheritdoc
     */
    toString(): any {
        let stringifyO = super.toString();

        stringifyO['options'] = {
            ...stringifyO['options'],
            is_weak: this.is_weak,
            typeof: PackageTypeOf.TRAVELCOLIS,
            size: {
                heigth: this.size_heigth,
                depth: this.size_heigth,
                width: this.size_width,
                piece_nber: this.size_piece_nber,
                length: this.size_piece_length,
                weight: this.weight
            },
            package_name: this.package_name,
            receiver: this.receiver.toString()
        };
        stringifyO['type'] = TravelPackage.TYPE;
        stringifyO['geo'] = this.geo;
        return stringifyO;
    }
}

export class Person extends Package {
    static TYPE = 'TransportPersonService';

    is_weak: Boolean = false;
    typeof: String = '';
    size_heigth: Number = 0.0;
    size_depth: Number = 0.0;
    size_width: Number = 0.0;
    size_piece_nber: Number = 0;
    latitude: Number = 0;
    longitude: Number = 0;
    size_piece_length: Number = 0;
    number_place: Number = 0;
    luggage_weight: Number = 0;
    package_name: String = '';
    receiver: ReceiverColis = new ReceiverColis();
    // geo: any = null;

    hydrate(entity: any): void {

        let options = purgeAttribute(this, entity, 'options');
        this.is_weak = purgeAttribute(this, options, 'is_weak');
        this.typeof = purgeAttribute(this, options, 'typeof');
        // this.geo = purgeAttribute(this, options, 'geo');
        this.package_name = purgeAttribute(this, options, 'package_name');
        this.number_place = purgeAttribute(this, entity, 'field_numberPlace');
        this.luggage_weight = purgeAttribute(this, entity, 'luggage_weight');
        this.latitude = purgeAttribute(this, options, 'latitude');
        this.longitude = purgeAttribute(this, options, 'longitude');
        if (entity.hasOwnProperty('size')) {
            this.size_heigth = purgeAttribute(this, options.size, 'heigth');
            this.size_depth = purgeAttribute(this, options.size, 'depth');
            this.size_width = purgeAttribute(this, options.size, 'width');
            this.size_piece_nber = purgeAttribute(this, options.size, 'piece_nber');
            this.size_piece_nber = purgeAttribute(this, options.size, 'length');
        }
        if (entity.options.receiver) {
            this.receiver.hydrate(entity.options.receiver);
            this.receiver.id = this.receiver.id == null ? '' : this.receiver.id;
        }
        super.hydrate(entity)
    }

    /**
     * @inheritdoc
     */
    toString(): any {
        let stringifyO = super.toString();

        stringifyO['options'] = {
            ...stringifyO['options'],
            // is_weak: this.is_weak,
            typeof: PackageTypeOf.PERSON,
            // size: {
            //     heigth: this.size_heigth,
            //     depth: this.size_heigth,
            //     width: this.size_width,
            //     piece_nber: this.size_piece_nber,
            //     length: this.size_piece_length,
            //     weight: this.weight
            // },
            package_name: this.package_name,
            // receiver: this.receiver.toString()
        };
        stringifyO['type'] = Person.TYPE;
        stringifyO['luggage_weight'] = this.luggage_weight;
        // stringifyO['geo'] = this.geo;
        return stringifyO;
    }
}

export class ReceiverColis extends Entity {
    public name: String = "";
    public contact: String = "";
    public parttypesupplied: String = "";
    public email: String = "";
    public address: String = "";
    public phone_number: String = "";
}

export enum PackageTypeOf {
    PERSON = "person",
    COLIS = "colis",
    TRAVELCOLIS = "travel_colis"
}

export function packageBuilder(entity: Record<string, any>): Package {
    let pck: Package = null;
    if (entity.options) {
        if (entity.options.typeof != PackageTypeOf.PERSON) pck = new ColisPackage();
        pck.hydrate(entity);
    }
    // console.log("Hydrated package ", pck);
    return pck;
}