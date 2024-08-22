import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../shared/service/api/api.service';

@Component({
  selector: 'app-test-pages',
  templateUrl: './test-pages.component.html',
  styleUrls: ['./test-pages.component.scss']
})
export class TestPagesComponent implements OnInit {

  @ViewChild('fileupload') inputUpload:ElementRef;
  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  fileUpload(e)
  {
    let file:File=e.target.files[0];
    let fileReader:FileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener('load',(e)=>{
      this.api.post('testupload',{
        file:fileReader.result,
        options:{
          name:file.name,
          type:file.type,
          lastModified:file.lastModified,
          size:file.size
        }
      })
      .subscribe((result)=>{
        console.log("Upload ok",result);
      },(error: any)=>console.log("Upload Error: ", error))
      console.log(file)
    })

    
  }

}
