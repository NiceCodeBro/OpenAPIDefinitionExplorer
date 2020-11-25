import { Component } from '@angular/core';
import SwaggerParser from "@apidevtools/swagger-parser";
import { read } from 'fs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'openapi-explorer';
  valEndPoints = [];
  typedEPName: string;
  typedEPTail: string; 

  asdasda:string;

  ngOnInit()	{
    var apiFileName = "openapi-complex.yaml";
    this.openApiSpecParser(apiFileName)
  }

  onTextChange(textValue) {
    var splittedText: Array<string> = textValue.split(':');
    if(splittedText.length === 2) {
      this.typedEPName = splittedText[0];
      this.typedEPTail = splittedText[1];
    } else {
      this.typedEPName = "";
      this.typedEPTail = "";
    }
  }

 
  
  openApiSpecParser(apiFileName:string): any {
    const parser = new SwaggerParser();
    
    return parser.dereference(apiFileName).then((api)=> {
      for (let [key, value] of Object.entries(api.paths)) {
          //key: /random-string -  value: {get : {...}}
          for (let [key2, value2] of Object.entries(value)) {
              // key2: get - value2: summary -  value2: responses
              for (let [key3, value3] of Object.entries(value2['responses'])) {
                  // key3: 200 (error code) - value3.description - value3.content
                  // if we can reach this point, content is valid, we can save it into our array
                  if (value3['content'] && value3['content']['application/json'] && 
                      key3 && value3['content']['application/json'].schema) { 
                        
                      var tempObj = { endPointName: key.substring(1)}
                      tempObj['properties'] = value3['content']['application/json'].schema.properties;
                      this.valEndPoints.push(tempObj);
                  }
              }
          }
      }
    });
  }

  onChangeSelectedFile(file:any) {
   
   /* console.log(file[0]);
    var reader = new FileReader();

    reader.addEventListener("loadend", ()=> {

    var blob = new Blob([reader.result], {type: 'text/plain'});*/
    //link.href = window.URL.createObjectURL(blob);
   // link.click();

    //  new SwaggerParser().parse(blob)
   // }
    //this.openApiSpecParser(<string>reader.result)
    //);
   // reader.readAsText(file[0]);
    
  }
}