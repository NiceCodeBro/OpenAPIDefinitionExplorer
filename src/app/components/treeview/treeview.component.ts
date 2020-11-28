import { Component, Input} from '@angular/core';
import {INode} from '../model';

@Component({
  selector: 'treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.css']
})
export class TreeViewComponent {
  @Input() prop: INode;
  @Input() path: string[];
  
  isExpanded: boolean = false;

  onClick() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnChanges() {
    if (this.path.length > 0 && this.path[0] === this.prop.name) {
      this.isExpanded = true;
      this.path.shift();
    } else {
      this.isExpanded = false;
    }
  }
}
