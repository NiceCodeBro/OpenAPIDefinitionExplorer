import { Component, Input, SimpleChanges} from '@angular/core';

@Component({
  selector: 'treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.css']
})
export class TreeViewComponent {
  @Input() name: string;
  @Input() props: any;
  @Input() typedEPName: string;
  @Input() typedEPTail: string;
  isExpanded: boolean = false;

  onClick() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'typedEPName': {
            if (this.typedEPName === this.name) {
              this.isExpanded = true;
            } else {
              this.isExpanded = false;
            }
          }
        }
      }
    }
  }
}
