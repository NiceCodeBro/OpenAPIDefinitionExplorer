import { Component } from '@angular/core';
import {openApiSpecParser} from '../services/swaggerservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  validEndPoints = [];
  inputValue = "";

  constructor() {}

  ngOnInit()	{
    const apiFileName = "openapi-complex.yaml";    
   // const apiFileName = "openapi-simple.yaml";    
    this.validEndPoints = openApiSpecParser(apiFileName)
  }

  handlePathToClickedNodeUpdate(path) {
  //  path = [...new Set(path)]

    this.inputValue = "";
    path.map((o, i)=>{
      if(i == 0) {
        this.inputValue += o + ':';
      } else {
        this.inputValue += o;
        if (path.length !== i + 1) {
          this.inputValue += '.';
        }
      }
    });
  }
}