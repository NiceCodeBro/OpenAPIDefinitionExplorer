import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TreeviewService } from 'src/app/service/treeview.service';
import { IProperty } from '../../models/model';
import * as uuid from 'uuid';

@Component({
  selector: 'node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})

export class NodeComponent implements OnInit {
  @Input() prop: IProperty;
  @Input() isExpanded: boolean = false;
  @Output() clickedNameOut = new EventEmitter<string>();
  componentId = uuid.v4();

  hasOwnChildren: boolean = false;
  lastSelectedCompID = "";
  isBold: boolean = false;

  constructor(private treeviewService: TreeviewService) {}

  onLeafNodeClicked() {
    this.clickedNameOut.emit(this.prop.name);
    this.treeviewService.setLastSelectedCompID(this.componentId)
  }

  ngOnInit(): void {
    this.hasOwnChildren = this.prop.properties !== undefined;
    this.treeviewService.currentSelectedCompID.subscribe(newSelectedID => this.lastSelectedCompID = newSelectedID)
  }

  ngOnChanges(): void {
    this.isBold = this.componentId === this.lastSelectedCompID;
  }
}
