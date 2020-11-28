import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {INode} from '../model';

@Component({
  selector: 'treeview-child',
  templateUrl: './treeview-child.component.html',
  styleUrls: ['./treeview-child.component.css']
})

export class TreeViewChildComponent implements OnInit {
  @Input() prop: INode;
  @Input() path: string[];

  isExpanded: boolean = false;

  onClick() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(): void {
    this.prop = {
      name: this.prop['key'],
      ...this.prop['value']
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.path.length > 0 && this.path[0] === this.prop.name) {
      this.isExpanded = true;
      this.path.shift();
    } else {
      this.isExpanded = false;
    }
  }
}