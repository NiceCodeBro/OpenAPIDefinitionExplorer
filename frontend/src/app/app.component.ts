/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component } from '@angular/core';
import { openApiSpecParser } from '../services/swaggerservice';
import { TreeviewService } from './service/treeview.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  validEndPoints: object = [];
  pathText = '';
  fileContent = '';
  responseText = '';
  isBackendActive = true;

  //
  constructor(private treeviewService: TreeviewService) {}

  ngOnInit() {
    // static file configuration should be done here.
    if (!this.isBackendActive) {
      const apiFileName = 'openapi-complex.yaml';
      this.validEndPoints = openApiSpecParser(apiFileName);
    }
  }

  handlePathToClickedNodeUpdate(path: Array<string>) {
    //path = [...new Set(path)]

    this.pathText = '';
    path.map((elm, i) => {
      this.pathText += elm;

      //if first element
      if (i === 0) {
        this.pathText += ':';
      }
      //if not last element
      else if (path.length !== i + 1) {
        this.pathText += '.';
      }
    });
  }

  handleFileChange(choosedFiles: object) {
    const choosedFile = choosedFiles[0]; //get file choosed first
    const reader = new FileReader();

    reader.readAsText(choosedFile);

    reader.onloadend = () => {
      const fileContent = reader.result as string;

      //api call
      this.treeviewService.getParsedOpenAPIFile(fileContent).subscribe(
        (res) => {
          this.validEndPoints = res;
          this.handleResponseText('Success!');
        },
        (err) => {
          this.handleResponseText('Server dont response or bad request.');
        }
      );
    };

    reader.onerror = () => {
      this.handleResponseText('Error occurred while reading file.');
    };
  }

  handleResponseText(responseText: string) {
    this.responseText = responseText;
    setTimeout(() => {
      this.responseText = '';
    }, 4000);
  }
}
