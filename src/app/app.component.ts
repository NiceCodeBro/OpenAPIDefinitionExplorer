import { Component } from '@angular/core';
import {openApiSpecParser} from '../services/swaggerservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  validEndPoints = [];
  splittedPath   = [];
  inputValue = "";

  ngOnInit()	{
    const apiFileName = "openapi-complex.yaml";    
    //const apiFileName = "openapi-simple.yaml";    
    this.validEndPoints = openApiSpecParser(apiFileName)
  }

  onOpenedPathUpdate(obj) {
    obj = [...new Set(obj)]

    this.inputValue = "";
    obj.map((o, i)=>{
      if(i == 0)
        this.inputValue += o + ':';
      else {
        this.inputValue += o;
        if (obj.length !== i + 1) {
          this.inputValue += '.';
        }
      }
    })
    this.onTextChange(this.inputValue);
  }

  onTextChange(textValue) {
    var splittedText: Array<string> = textValue.split(':');
    if(splittedText.length === 2) {
      this.splittedPath = [];

      this.splittedPath.push(splittedText[0]);

      splittedText[1].split('.').map((text)=>{
        this.splittedPath.push(text);
      })
    } else {
      this.splittedPath = [];
    }
  }
}