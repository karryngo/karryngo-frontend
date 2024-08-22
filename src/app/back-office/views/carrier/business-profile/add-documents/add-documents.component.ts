import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProviderService } from '../../../../../shared/service/back-office/provider.service';

@Component({
    selector: 'app-add-documents',
    templateUrl: './add-documents.component.html',
    styleUrls: ['./add-documents.component.css']
})
export class AddDocumentsComponent implements OnInit {
    @Input() provider_profile: any;
    @Output() eventEmitter: EventEmitter<any> = new EventEmitter();
    new_documents: File[] = [];

    // new_documents: any[] = [];
    saving_document = true;
    document_saved: boolean = false
    constructor(
            private providerService: ProviderService,
        ) { }

    ngOnInit(): void {
    }

    save_document(){
        if (this.new_documents.length==0) {
            return
        }
        this.saving_document = true;
        const formData = new FormData();
        for (let i = 0; i < this.new_documents.length; i++) {
            formData.append('files', this.new_documents[i]);
        }
        this.providerService.saveProviderDocuments(this.provider_profile._id, formData).subscribe((res)=>{
            this.saving_document = false;
            this.new_documents = [];
            // this.document_saved = true;
            this.eventEmitter.emit();
        }, (err)=>{
            this.saving_document = false;
        })
    }

    closeSavingAlert(){
        // this.document_saved = false;
    }

    async handleFileInput(event) {
        const file = event.target.files[0];
    
        if (file) {
            const response = await fetch(URL.createObjectURL(file));
            const blob = await response.blob();
            const newFile = new File([blob], file.name, { type: file.type });
            this.new_documents.push(newFile);
        }
    }

    remove(i: number){
        // Remove the document at index i from the new_documents array
        this.new_documents.splice(i, 1);
    }

}
