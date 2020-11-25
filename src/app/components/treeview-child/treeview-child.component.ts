import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'treeview-child',
  templateUrl: './treeview-child.component.html',
  styleUrls: ['./treeview-child.component.css']
})

export class TreeViewChildComponent implements OnInit {
  @Input() typedEPTail: string;
  @Input() titel: string;
  @Input() dataVal: string;

  typedEPTailRest: string;
  hasSubProps: boolean = false;
  isExpanded: boolean = false;

  onClick() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(): void {
    this.hasSubProps = this.dataVal['properties'] !== undefined;
    this.handleTypedTail();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'typedEPTail': {
            this.handleTypedTail();
          }
        }
      }
    }
  }

  handleTypedTail() {
    if (this.typedEPTail && this.typedEPTail.length) {
      var splittedTail: Array<string> = this.typedEPTail.split(".");

      if (splittedTail && splittedTail.length) {
        var dataKey = splittedTail[0];
        if (dataKey === this.titel) {
          this.isExpanded = true;
        } else { 
          this.isExpanded = false;
        }
        this.typedEPTailRest = splittedTail.splice(1).join('.');
      }
    }
  }
}
