import { Component } from '@angular/core';
import { openApiSpecParser } from '../services/swaggerservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  validEndPoints: Array<Object> = [];
  pathText: string = '';

  constructor() {}

  ngOnInit()	{
    // static file configuration should be done here.
    const apiFileName: string = 'openapi-complex.yaml';
    // const apiFileName = 'openapi-simple.yaml';    

    this.validEndPoints = openApiSpecParser(apiFileName)
  }

  handlePathToClickedNodeUpdate(path: Array<string>) {
    //path = [...new Set(path)]

    this.pathText = '';
    path.map((elm, i) => {
      this.pathText += elm;
      
      if(i === 0) { //if first element
        this.pathText += ':'; 
      } else if (path.length !== i + 1) { //if not last element
        this.pathText += '.';
      }
    });
  }
}