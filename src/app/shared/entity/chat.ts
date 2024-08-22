import { purgeAttribute } from './entity';

export class Message
{
    _id:String="";
    from:String=new String();
    to:String=new String();
    date:String="";
    title:String="";
    content:String="";
    read:number=0;
    idDiscussion?:String="";

    toString():any
    {
        return {
            _id:this._id,
            from:this.from,
            to:this.to,
            date:this.date,
            title:this.title,
            content:this.content,
            idDiscussion:this.idDiscussion,
            read:this.read
        };
    }

    static hydrate(entity: any): Message
    {
        let m:Message=new Message();
        for(const key in entity)
        {
            Reflect.set(m,key,purgeAttribute(m,entity,key)); 
        }
        return m;
    }
}

export class Discussion
{
    _id:String="";
    inter1:String="";
    inter2:String="";
    idProject:String="";
    idTransaction:String="";
    chats:Message[]=[];
    read:number=0;
    date?:string;
    service?:string;

    toString()
    {
        return {
            _id:this._id,
            inter1:this.inter1,
            inter2:this.inter2,
            chats:this.chats.map((chat)=>chat.toString()),
            idProject:this.idProject,
            read:this.read
        }; 
    }
    static hydrate(entity: any): Discussion
    {
        let d:Discussion=new Discussion();
        for(const key in entity)
        {
            if(key=="chats") d.chats=purgeAttribute(d,entity,"chats")
                ?purgeAttribute(d,entity,"chats").map((chat:Record<string,any>)=> {
                    let m:Message=Message.hydrate(chat);
                    m.idDiscussion=entity._id;
                    return m;
                })
                :[];
            else Reflect.set(d,key,purgeAttribute(d,entity,key)); 
        }
        return d;        
    }


}