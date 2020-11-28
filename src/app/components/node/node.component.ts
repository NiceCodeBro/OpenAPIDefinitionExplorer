import { Component, OnInit, Input } from '@angular/core';
import { INode } from '../model';

@Component({
  selector: 'node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {
  @Input() prop: INode;
  @Input() isExpanded: boolean;

  hasGrandchild: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.hasGrandchild = this.prop.properties !== undefined;
  }
}
