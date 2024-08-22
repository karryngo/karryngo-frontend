import { Component, OnInit, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { FormControlName, Validators, FormControl } from '@angular/forms';
import { Document } from '../../../../shared/entity/provider';


@Component({
    selector: 'app-input-file-upload',
    templateUrl: './input-file-upload.component.html',
    styleUrls: ['./input-file-upload.component.css']
})
export class InputFileUploadComponent implements OnInit 
{
    inputFile:FormControl= new FormControl('',[Validators.required])
    documents:Document[]=[];
    @Input() multiple:boolean=false;
    @Input() accept:String="";
    @Output() image_event = new EventEmitter<string>();
    @Input() maxFileSize: number = 1 * 1024 * 1024;
    fileTooLarge: boolean = false;

    constructor() { }

    ngOnInit(): void {

    }
    fileUpload(e) {
        const file: File = e.target.files[0];
        if (file && file.size > this.maxFileSize) {
            this.fileTooLarge = true;
            // this.image_event.emit('File is too large');
            console.log(file.size)
        } else {
            this.fileTooLarge = false;
            // this.image_event.emit(file);
            this.image_event.emit(e);
        }
    }
    // fileUpload(e) {
    //   this.documents = [];
    //   for (let file of e.target.files) {
    //     console.log(file)
    //     let fileReader: FileReader = new FileReader();
    //     fileReader.readAsDataURL(file);
    //     fileReader.addEventListener('load', (e) => {
    //       let doc: Document = new Document();
    //       doc.name = file.name;
    //       doc.lastModified = file.lastModified;
    //       doc.size = file.size;
    //       doc.type = file.type;
    //       doc.data = fileReader.result;
    //       // console.log("File ",doc)
    //       this.documents.push(doc);
    //     });
    //   }
    // }

}
