import { Component, Input} from '@angular/core';
import { prototype } from 'events';
import { IProperty } from '../model';

@Component({
  selector: 'treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.css']
})
export class TreeViewComponent {
  @Input() prop: IProperty;
  @Input() path: string[];
  isExpanded: boolean = false;

  onIsExpandedUpdate(event) {
    this.isExpanded = event;
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
