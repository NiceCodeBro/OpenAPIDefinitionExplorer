import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'treeview-child',
  templateUrl: './treeview-child.component.html',
  styleUrls: ['./treeview-child.component.css']
})

export class TreeViewChildComponent implements OnInit {
  @Input() props: any;
  @Input() path: string[];

  hasGrandchild: boolean = false;
  isExpanded: boolean = false;

  onClick() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(): void {
    this.hasGrandchild = this.props['value']['properties'] !== undefined;

    this.props = {
      name: this.props['key'],
      ...this.props['value']
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.path.length > 0 && this.path[0] === this.props['name']) {
      this.isExpanded = true;
      this.path.shift();
    } else {
      this.isExpanded = false;
    }
  }
}