import { Component, Input, Output, EventEmitter} from '@angular/core';
import { IProperty } from '../../models/model';

/**
 * This is main tree view component which has a recursive logic in itself
 **/ 
@Component({
  selector: 'treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.css']
})

export class TreeViewComponent {
  @Input() prop: IProperty;
  @Output() openedPathOut = new EventEmitter<Array<string>>();
  isExpanded: boolean = false;

  /**
   * this causes to be shown its own properties.
   **/ 
  onTreeviewTitelClicked() {
    this.isExpanded = !this.isExpanded;
    //(this.isExpanded === false) ? this.openedPathOut.emit([]) : null;
  }

  /**
   * get name of the node clicked which belongs to this component
   * and transmit it to this' parent component
   * {@param} aName name of node clicked 
   **/ 
  handleClickedNameUpdate(aName: string) {
    if (this.isExpanded) {
      let pathToClickedNode: string[] = [];
      pathToClickedNode.push(this.prop.name);
      pathToClickedNode.push(aName);
      this.openedPathOut.emit(pathToClickedNode);
    } else {
      this.openedPathOut.emit([]);
    }
  }

  /**
   * this is called when there is a circular treeview structure
   * and it gets path to clicked node up to this component
   * {@param} aPathToClickedNode 
   **/ 
  onOpenedPathUpdate(aPathToClickedNode: string[]) {
    let pathToClickedNode: string[] = [];
    pathToClickedNode.push(this.prop.name);
    pathToClickedNode.push(...aPathToClickedNode);
    this.openedPathOut.emit(pathToClickedNode);
  }

  /**
   * this structure accepts object, so it needs to loop throug this object
   * in order to get rid of key and value, this function transforms data in a proper way
   * {@param} aProp 
   * @returns aProp 
   **/ 
  transformProp(aProp) {
    if (aProp.hasOwnProperty('key') && aProp.hasOwnProperty('value')) {
      return {
        name: aProp['key'],
        ...aProp['value']
      }
    }
    return aProp;
  }
}
