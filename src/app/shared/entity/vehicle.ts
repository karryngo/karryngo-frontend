
export class Vehicle {
    field_id: string;
    field_type: string;
    field_name: string;
    field_bran: string;
    field_photo: any[];
    field_placeNumber: string;
    field_description: string;

    type:String="";
  
    static hydrate(entity:Record<string,any>):Vehicle
    {
        let pac:Vehicle=new Vehicle();
        for(const key in entity)
        {
            Reflect.set(pac,key,entity[key]);
        }
        return pac;
    }
  }
  