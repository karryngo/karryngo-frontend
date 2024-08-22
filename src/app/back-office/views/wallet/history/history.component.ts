import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../../../shared/service/back-office/wallet.service';
import { UserlocalstorageService } from '../../../../shared/service/localstorage/userlocalstorage.service';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

    current_user: any;
    wallet: any;
    constructor(
        private local_storage: UserlocalstorageService,
        private walletService: WalletService
    ) { }

    ngOnInit(): void 
    {
        this.local_storage.dataUser.subscribe((data: any) => {
            console.log(data.user)
            this.current_user = data.user
        })

        this.find_wallet()
        
    }

    find_wallet(){
        this.walletService.get_user_wallet(this.current_user._id)
        .then((res) => {
            console.log(res)
            this.wallet = res[0];
        })
        .catch((error) => {
            console.log(error)
        })
    }

}


