import { Component, Input, Output, EventEmitter} from '@angular/core';
import { tick } from '@angular/core/testing';
import { IProperty } from '../../models/model';

@Component({
  selector: 'treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.css']
})
export class TreeViewComponent {
  @Input() prop: IProperty;
  @Input() path: string[];
  @Output() openedPathOut = new EventEmitter<Array<string>>();

  isExpanded: boolean = false;
  clickedNodeName: string = "";
  
  onTreeviewTitelClicked() {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded === false) {
      this.clickedNodeName = "";
    }
  }

  handleClickedNameUpdate(aName) {
    if ( this.isExpanded) {
      this.clickedNodeName = aName;

      var pathToClickedNode = [];
      pathToClickedNode.push(this.prop.name);
      pathToClickedNode.push(aName);
      this.openedPathOut.emit(pathToClickedNode);
    } else {
      this.clickedNodeName = "";
      this.openedPathOut.emit([]);
    }
  }

  onOpenedPathUpdate(aPathToClickedNode) {
    var pathToClickedNode = [];
    pathToClickedNode.push(this.prop.name);
    pathToClickedNode.push(...aPathToClickedNode);
    this.openedPathOut.emit(pathToClickedNode);
  }

  transformProp(aProp) {
    if (aProp.hasOwnProperty('key') && 
        aProp.hasOwnProperty('value')) {
          return {
            name: aProp['key'],
            ...aProp['value']
          }
    }
    return aProp;
  }

  ngOnChanges() {
    

    /* if (this.path.length > 0 && this.path[0] === this.prop.name) {
     // this.isExpanded = true;
      this.path.shift();
    } else {
      //this.isExpanded = false;
    }*/
  }
}
