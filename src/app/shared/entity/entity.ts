export function purgeAttribute(ref,object:Record<string|number,any>,attr:string):any
{        
    if(object==null || object==undefined) return null;
    if(object.hasOwnProperty(attr.toString())) return object[attr.toString()]
    if(ref.hasOwnProperty(attr.toString()))  return Reflect.get(ref,attr.toString());
    return null;
}

export function generateId():string
{
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
}

export class Entity
{
    _id:string="";
    
    set id(id:string){
        this._id=id;
    }

    get id():string
    {
        return this._id;
    }
    hydrate(entity: Record<string | number,any>):void
    {
        for(const key of Object.keys(entity))
        {
            if(Reflect.has(this,key)) Reflect.set(this,key,entity[key]);
        }
    }

    toString():Record<string | number,any>
    {
        let r={};
        for(const k of Object.keys(this))
        {
            r[k]=Reflect.get(this,k);
        }
        return r;
    }
}