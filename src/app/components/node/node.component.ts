import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IProperty } from '../../models/model';

@Component({
  selector: 'node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})

export class NodeComponent implements OnInit {
  @Input() prop: IProperty;
  @Input() isExpanded: boolean = false;
  @Input() isBold: boolean = false;
  @Output() clickedNameOut = new EventEmitter<string>();

  hasOwnChildren: boolean = false;

  onLeafNodeClicked() {
    this.clickedNameOut.emit(this.prop.name);
  }

  ngOnInit(): void {
    this.hasOwnChildren = this.prop.properties !== undefined;
  }
}
