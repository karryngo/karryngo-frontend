import { Package, PackageState } from "../entity/package";
import { Provider } from "../entity/provider";
import { Transaction, TransactionState } from "../entity/transaction";

export function getUiIconFromStatusPackage(pkg:Package,transaction:Transaction)
{
    let icon="";
    switch (pkg.state)
    {
        case PackageState.SERVICE_INIT_STATE:
        icon="layers"
        break
        case PackageState.SERVICE_IN_DISCUSS_STATE:
        icon="chat-dots"
        break
        case PackageState.SERVICE_IN_TRANSACTION_STATE:
        switch(transaction.state)
        {
            case TransactionState.INIT:
            icon="chat-dots"
            case TransactionState.SERVICE_ACCEPTED_AND_WAITING_PAIEMENT:
            icon="cash-coin";
            case TransactionState.SERVICE_PAIEMENT_DONE_AND_WAITING_START:
            icon="cart-x"
            case TransactionState.SERVICE_RUNNING:
            icon="arrow-right"
            case TransactionState.SERVICE_DONE_AND_WAIT_PROVIDER_PAIEMENT:
            icon="cash-stack"
            case TransactionState.SERVICE_PROVIDER_PAIEMENT_DONE:
            case TransactionState.SERVICE_END:
            icon="check2-all"
        }
        break
        case PackageState.SERICE_END:
        icon="check2-all"
        break;
    }
    // console.log("icon" , icon)
    return icon;
}