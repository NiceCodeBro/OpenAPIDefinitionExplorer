import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IProperty } from '../../models/model';

@Component({
  selector: 'node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})

export class NodeComponent implements OnInit {
  @Input() prop: IProperty;
  @Output() isExpandedOut = new EventEmitter();

  isExpanded: boolean = false;
  hasOwnChildren: boolean = false;

  onClick() {
    this.isExpanded = !this.isExpanded;
    this.isExpandedOut.emit(this.isExpanded);
  }

  ngOnInit(): void {
    this.hasOwnChildren = this.prop.properties !== undefined;
  }
}
