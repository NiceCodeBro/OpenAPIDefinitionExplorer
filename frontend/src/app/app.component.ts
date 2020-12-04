/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  validEndPoints: any = [];
  pathText = '';
  fileContent = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // static file configuration should be done here.
    //const apiFileName = 'openapi-complex.yaml'; //->>>>>>>>>>change it to test other files
    // const apiFileName = 'openapi-simple.yaml';
    // this.validEndPoints = openApiSpecParser(apiFileName);
  }

  handlePathToClickedNodeUpdate(path: Array<string>) {
    //path = [...new Set(path)]

    this.pathText = '';
    path.map((elm, i) => {
      this.pathText += elm;

      if (i === 0) {
        //if first element
        this.pathText += ':';
      } else if (path.length !== i + 1) {
        //if not last element
        this.pathText += '.';
      }
    });
  }

  handleFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsText(file);
    reader.onloadend = () => {
      this.http
        .post(
          'http://localhost:3000/api/v1.0/parser/swaggerparser',
          { filecontent: reader.result },
          { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
        )
        .toPromise()
        .then((a) => (this.validEndPoints = a))
        .catch((err) => console.log(err));
    };

    reader.onerror = function () {
      console.log(reader.error);
    };
  }
}
