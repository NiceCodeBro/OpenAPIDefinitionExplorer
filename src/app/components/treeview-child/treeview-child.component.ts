import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'treeview-child',
  templateUrl: './treeview-child.component.html',
  styleUrls: ['./treeview-child.component.css']
})

export class TreeViewChildComponent implements OnInit {
  @Input() child: string;
  @Input() path: string[];

  titel: string = "";
  children: string = "";

  hasGrandchild: boolean = false;
  isExpanded: boolean = false;

  onClick() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(): void {
   // console.log(this.child)
    this.titel = this.child['key'];
    this.children = this.child['value'];
    this.hasGrandchild = this.child['value']['properties'] !== undefined;
/*
    var tempProps = {
      name: this.props['key'];
      properties: this.props['value'];
    }*/
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.path.length > 0 && this.path[0] === this.titel) {
      this.isExpanded = true;
      this.path.shift();
    } else {
      this.isExpanded = false;
    }
  }
}
