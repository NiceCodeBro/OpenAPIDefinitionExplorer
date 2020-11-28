import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {INode} from '../model';

@Component({
  selector: 'treeview-child',
  templateUrl: './treeview-child.component.html',
  styleUrls: ['./treeview-child.component.css']
})

export class TreeViewChildComponent implements OnInit {
  @Input() node: INode;
  @Input() path: string[];

  hasGrandchild: boolean = false;
  isExpanded: boolean = false;

  onClick() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(): void {
    this.node = {
      name: this.node['key'],
      ...this.node['value']
    }
    this.hasGrandchild = this.node.properties !== undefined;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.path.length > 0 && this.path[0] === this.node.name) {
      this.isExpanded = true;
      this.path.shift();
    } else {
      this.isExpanded = false;
    }
  }
}