import { Component, ViewChild } from '@angular/core';
import SwaggerParser from "@apidevtools/swagger-parser";
//import {api} from './parser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'openapi-explorer';
  validEndPoints = [];
  @ViewChild('child') childElements; 
  isExpanded: boolean = false;

  ngOnInit()	{
   this.myFunc()
  }

  onClick() {
    this.isExpanded = !this.isExpanded;
  }
  
  myFunc(): Promise<any> {
    let parser = new SwaggerParser();

    return parser.dereference("openapi-complex.yaml").then((api)=> {
      for (let [key, value] of Object.entries(api.paths)) {
          //key: /random-string -  value: {get : {...}}
          for (let [key2, value2] of Object.entries(value)) {
              // key2: get - value2: summary -  value2: responses
              for (let [key3, value3] of Object.entries(value2['responses'])) {
                  // key3: 200 (error code) - value3.description - value3.content
                  // if we can reach this point, content is valid, we can save it into our array
                  if (value3['content'] && value3['content']['application/json'] && 
                      key3 && value3['content']['application/json'].schema) { 

                      var tempObj = { endPoint: key}
                      tempObj['properties'] = value3['content']['application/json'].schema.properties;
                      this.validEndPoints.push(tempObj);
                  }
              }
          }
      }
    });
  }
}