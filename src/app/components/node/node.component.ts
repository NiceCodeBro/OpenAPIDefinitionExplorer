import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IProperty } from '../model';

@Component({
  selector: 'node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {
  @Input() prop: IProperty;
  @Output() isExpandedOut = new EventEmitter();

  isExpanded: boolean = false;
  hasGrandchild: boolean = false;

  onClick() {
    this.isExpanded = !this.isExpanded;
    this.isExpandedOut.emit(this.isExpanded);
  }

  constructor() { }

  ngOnInit(): void {
    this.hasGrandchild = this.prop.properties !== undefined;
  }
}
