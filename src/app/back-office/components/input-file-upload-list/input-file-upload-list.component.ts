import { Component, OnInit, Input, ComponentFactoryResolver, ViewContainerRef, ViewChild, ViewChildren, QueryList, EventEmitter, Output } from '@angular/core';
import { InputFileUploadComponent } from "./input-file-upload/input-file-upload.component";
import { Document } from '../../../shared/entity/provider';


@Component({
    selector: 'app-input-file-upload-list',
    templateUrl: './input-file-upload-list.component.html',
    styleUrls: ['./input-file-upload-list.component.css']
})
export class InputFileUploadListComponent implements OnInit {
    // list of documents selected

    nbInputFile: { file: string | null }[] = [];

    @ViewChildren(InputFileUploadComponent) inputFiles: QueryList<InputFileUploadComponent>;
    @Input() label:String="";
    @Input() accept:String="";
    @Input() maxFileSize:number;
    @Output() newImageEvent = new EventEmitter<string>();
    @Output() removeImageEvent = new EventEmitter<string>();
    constructor() { }

    ngOnInit(): void {
    }

    addDoc() {
        this.nbInputFile.push({ file: null });
    }
    remove(index: number) {
        const removedItem = this.nbInputFile.splice(index, 1)[0];
        this.nbInputFile.splice(index, 1);
        this.removeImageEvent.emit(removedItem.file);
    }
    getDocumentsList(): Document[] {
            let docs: Document[] = [];
            this.inputFiles.forEach((component: InputFileUploadComponent) => {
            component.documents.forEach((doc: Document) => docs.push(doc));
        });
        return docs;
    }

    get_file(e, index: number){
        this.nbInputFile[index].file = e;
        this.newImageEvent.emit(e);
    }

}
