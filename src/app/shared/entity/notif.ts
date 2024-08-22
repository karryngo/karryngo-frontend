import { Entity, purgeAttribute } from './entity';
import { Zone as Location, Document, Vehicle } from './provider'

export enum NotifType {
    PROVIDER = "provider",
    REQUESTER = "requester",
    GENERAL = "general",
}


export class Notif extends Entity {
    
    read:Boolean;
    title:String;
    user_id:String="";
    service_id:String="";
    content:String="";
    type:String="";
    date: String;


    constructor(
        id: string = '',
        // is_urgent: Boolean = false,
        // details: String = '',
        // images: String[] = [],
        // from: Location = new Location(),
        // to: Location = new Location(),
    ) {
        super();
        this._id = id;
        // this.is_urgent = is_urgent;
        // this.description = details;
        // this.images = images;
        // this.from = from;
        // this.to = to;
        // this.date = (new Date()).toISOString();

    }

    /**
     * @inheritdoc
     */
    hydrate(entity: any): void {
        this.read = purgeAttribute(this, entity, 'read');
        this.title = purgeAttribute(this, entity, 'title');
        this.user_id = purgeAttribute(this, entity, 'user_id');
        this.service_id = purgeAttribute(this, entity, 'service_id');
        this.content = purgeAttribute(this, entity, 'content');
        this.type = purgeAttribute(this, entity, 'type');
        this.date = purgeAttribute(this, entity, 'date');
    }

    /**
     * @inheritdoc
     */
    toString(): any {
        return {
            id: this.id,
            read: this.read,
            title: this.title,
            user_id: this.user_id,
            service_id: this.service_id,
            content: this.content,
            type: this.type,
            date: this.date,
        };
    }
}
