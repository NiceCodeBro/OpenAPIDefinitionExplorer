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
  //this contains parse results of a *.yaml open api file
  validEndPoints: object = [];

  // this contains all name of elements from main treeview to clicked node
  pathToSelectedNode = '';

  //this indicates whether backend is desired to be used
  isBackendActive = true;

  //The following 3 variables are used if isBackendActive is true.
  //this contains text which is shown on screen on error/success cases
  stateIndicator = '';
  //it is set to true if state of api call is pending
  isContentLoading = false;
  //it is used to rotate api icon on pending state.
  apiIconStyle = '';

  constructor(private treeviewService: TreeviewService) {}

  ngOnInit() {
    // static file configuration should be done here.
    if (!this.isBackendActive) {
      const apiFileName = 'openapi-complex.yaml';
      this.validEndPoints = openApiSpecParser(apiFileName);
    }
  }

  /**
   * this handels text to be shown in path component
   * @param paths which contains all node names in sequence
   */
  handlePathToClickedNodeUpdate(paths: Array<string>) {
    //path = [...new Set(path)]

    this.pathToSelectedNode = '';
    paths.map((elm, i) => {
      this.pathToSelectedNode += elm;

      //if first element
      if (i === 0) {
        this.pathToSelectedNode += ':';
      }
      //if not last element
      else if (paths.length !== i + 1) {
        this.pathToSelectedNode += '.';
      }
    });
  }

  /**
   * This is called if a file is choosed
   * @param choosedFiles event from input component
   */
  handleFileChange(choosedFiles: object) {
    // reset old state
    this.validEndPoints = [];
    this.pathToSelectedNode = '';
    this.stateIndicator = '';

    const choosedFile = choosedFiles[0]; //get first choosed file
    const reader = new FileReader();

    reader.readAsText(choosedFile);

    //file is read successfully
    reader.onloadend = () => {
      const fileContent = reader.result as string;
      this.isContentLoading = true;
      this.handleLoadingSpin();

      //api call
      this.treeviewService.getParsedOpenAPIFile(fileContent).subscribe(
        (res) => {
          this.validEndPoints = res;
          this.handleResponseText('Success!');
          this.isContentLoading = false;
        },
        () => {
          this.handleResponseText('Server dont response or bad request.');
          this.isContentLoading = false;
        }
      );
    };

    reader.onerror = () => {
      this.handleResponseText('Error occurred while reading file.');
      this.isContentLoading = false;
    };
  }

  /**
   * setting variable with desired text for 4 seconds
   * @param stateIndicator
   */
  handleResponseText(state: string) {
    this.stateIndicator = state;
    setTimeout(() => {
      this.stateIndicator = '';
    }, 4000);
  }

  /**
   * it controls life cycle of rotation of api icon
   */
  handleLoadingSpin() {
    this.apiIconStyle = 'rotating 1s linear infinite';
    setTimeout(() => {
      if (this.isContentLoading) {
        this.handleLoadingSpin();
      } else {
        this.apiIconStyle = '';
      }
    }, 1000);
  }
}
