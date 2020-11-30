import { Component } from '@angular/core';
import {openApiSpecParser} from '../services/swaggerservice';
import { TreeviewService } from './service/treeview.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  validEndPoints = [];
  splittedPath   = [];
  inputValue = "";

  constructor() {}

  ngOnInit()	{
    const apiFileName = "openapi-complex.yaml";    
   // const apiFileName = "openapi-simple.yaml";    
    this.validEndPoints = openApiSpecParser(apiFileName)
  }

  onOpenedPathUpdate(obj) {
    obj = [...new Set(obj)]

    this.inputValue = "";
    obj.map((o, i)=>{
      if(i == 0) {
        this.inputValue += o + ':';
      } else {
        this.inputValue += o;
        if (obj.length !== i + 1) {
          this.inputValue += '.';
        }
      }
    });

  }
}