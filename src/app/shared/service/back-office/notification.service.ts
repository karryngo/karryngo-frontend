import { ApiService } from '../api/api.service';
import { Notif } from '../../../shared/entity/notif';

declare var $: any;

export class NotificationService {
    headers ={};

    notififs: Map<String,Notif>=new Map<String,Notif>();
    
    constructor(private api:ApiService) { 
        
    }

    getNotification(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            
        })
    }

    showNotification(from, align, colortype, icon, text) {

        $.notify({
        icon: icon,
        message: text
        }, {
        type: colortype,
        timer: 300,
        placement: {
            from: from,
            align: align
        }
        });
    }
}
