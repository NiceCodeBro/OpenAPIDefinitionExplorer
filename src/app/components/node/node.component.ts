import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TreeviewService } from 'src/app/service/treeview.service';
import { IProperty } from '../../models/model';
import * as uuid from 'uuid';

/**
 * Component which can be used to show a text with or without an arrow
 * which located in front of the text.
 **/ 
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
  isBold: boolean = false;
  lastSelectedCompID: string = '';

  constructor(private treeviewService: TreeviewService) {}

  ngOnInit(): void {
    // this variable states whether there should be an arrow 
    this.hasOwnChildren = this.prop.properties !== undefined;

    // Subscribing to last selected componendId
    this.treeviewService.currentSelectedCompID.subscribe(newSelectedID => 
                                 this.lastSelectedCompID = newSelectedID)
  }

  ngOnChanges(): void {
    this.isBold = this.componentId === this.lastSelectedCompID;
    //if (this.isExpanded === false && this.componentId === this.lastSelectedCompID) {
    // this.treeviewService.setLastSelectedCompID('');
    //}
  }

  /**
   * It is called when it' own property clicked
   **/ 
  onLeafNodeClicked(): void {
    //transmitting name of this node
    this.clickedNameOut.emit(this.prop.name);

    //saving component id to compare it later on to be able to show last clicked property as bold
    this.treeviewService.setLastSelectedCompID(this.componentId);
  }
}
