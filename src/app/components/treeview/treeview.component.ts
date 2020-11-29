import { Component, Input, Output, EventEmitter} from '@angular/core';
import { IProperty } from '../model';

@Component({
  selector: 'treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.css']
})
export class TreeViewComponent {
  @Input() prop: IProperty;
  @Input() path: string[];
  @Output() openedPathOut = new EventEmitter<object>();

  isExpanded: boolean = false;
  allOpened = [];

  onIsExpandedUpdate(isExpanded) {
    this.isExpanded = isExpanded;
    if ( this.isExpanded) {
      this.allOpened.push(this.prop.name);
      this.openedPathOut.emit(this.allOpened);
    } else {
      this.openedPathOut.emit([]);
    }
  }

  onOpenedPathUpdate(obj) {
    var temp = [];
    temp.push(this.prop.name);
    temp.push(...obj);
    
    this.openedPathOut.emit(temp);
  }

  ngOnInit(): void {
    if (this.prop.hasOwnProperty('key') && 
        this.prop.hasOwnProperty('value')) {
          this.prop = {
            name: this.prop['key'],
            ...this.prop['value']
          }
    }
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
