import { Entity } from "./entity";
import { Package } from "./package";

export enum TransactionState
{
    INIT,
    SERVICE_ACCEPTED_AND_WAITING_PAIEMENT,
    SERVICE_PAIEMENT_DONE_AND_WAITING_START,
    SERVICE_RUNNING,
    SERVICE_DONE_AND_WAIT_PROVIDER_PAIEMENT,
    SERVICE_PROVIDER_PAIEMENT_DONE,
    SERVICE_END,
}
export enum TransactionServiceState {
    service_init_STATE="service_init_STATE",
    SERVICE_ACCEPTED_AND_WAITING_PAIEMENT="service_accepted_and_waiting_paiement",
    SERVICE_PAIEMENT_DONE_AND_WAITING_START="service_paiement_done_and_waiting_start",
    SERVICE_RUNNING="service_running",
    SERVICE_DONE_AND_WAIT_PROVIDER_PAIEMENT="service_done_and_wait_provider_paiement",
    SERVICE_PROVIDER_PAIEMENT_DONE="service_provider_paiement_done",
    SERVICE_END="service_end",
}
export enum TransactionServiceLabel {
    service_init_STATE="my_services.my_services_state.service_init_STATE",
    service_accepted_and_waiting_paiement="my_services.my_services_state.service_accepted_and_waiting_paiement",
    service_paiement_done_and_waiting_start="my_services.my_services_state.service_paiement_done_and_waiting_start",
    service_running="my_services.my_services_state.service_running",
    service_done_and_wait_provider_paiement="my_services.my_services_state.service_done_and_wait_provider_paiement",
    service_provider_paiement_done="my_services.my_services_state.service_provider_paiement_done",
    service_end="my_services.my_services_state.service_end",
}
export enum TransactionServiceLabel_old {
    service_init_STATE="Open",
    service_accepted_and_waiting_paiement="Service accepted & waiting for paiement",
    service_paiement_done_and_waiting_start="Paiement done & waiting start",
    service_running="Service running",
    service_done_and_wait_provider_paiement="Service done & waiting provider paiement",
    service_provider_paiement_done="Provider's paiement done",
    service_end="Service Completed",
}
export class Transaction extends Entity
{
    state:TransactionState=TransactionState.INIT;
    idProvider:String="";
    idRequester:String="";
    price:number=0;
}
