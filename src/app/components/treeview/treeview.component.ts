import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, Output, EventEmitter} from '@angular/core';
import { TreeviewService } from 'src/app/service/treeview.service';
import { IProperty } from '../../models/model';

@Component({
  selector: 'treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.css']
})
export class TreeViewComponent {
  @Input() prop: IProperty;
  @Output() openedPathOut = new EventEmitter<Array<string>>();
  isExpanded: boolean = false;

  onTreeviewTitelClicked() {
    this.isExpanded = !this.isExpanded;
  }

  handleClickedNameUpdate(aName) {
    if ( this.isExpanded) {
      var pathToClickedNode = [];
      pathToClickedNode.push(this.prop.name);
      pathToClickedNode.push(aName);
      this.openedPathOut.emit(pathToClickedNode);
    } else {
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
    if (aProp.hasOwnProperty('key') && aProp.hasOwnProperty('value')) {
      return {
        name: aProp['key'],
        ...aProp['value']
      }
    }
    return aProp;
  }
}
