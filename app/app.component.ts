import { Component, OnInit } from '@angular/core';

import {FileUploader} from 'ng2-file-upload';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  url = 'https://evening-anchorage-3159.herokuapp.com/api/';
  ready = false;
  thumb="";
  uploader = new FileUploader({
    url: this.url,
    maxFileSize: 1024 * 1024 * 1
    });
  name = 'Angular 5';

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      console.log('***** onAfterAddingFile ******')
      var image_file=file._file
      const reader = new FileReader();
     reader.addEventListener('load', () => {
      console.log(reader.result)
      this.ready=true;
      this.thumb=reader.result.toString();
    });
    reader.readAsDataURL(image_file);
    }

    this.uploader.onCompleteItem =  (item:any, response:any, status:any, headers:any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
    };

    this.uploader.onCompleteAll = () => {
      console.log('******* onCompleteAll *********')
    }

    this.uploader.onWhenAddingFileFailed = (item: any, filter: any, options: any) => {
      console.log('***** onWhenAddingFileFailed ********')
    }
  }
}