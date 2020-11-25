import { Component, OnInit, Input, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-endpoint',
  templateUrl: './endpoint.component.html',
  styleUrls: ['./endpoint.component.css']
})
export class EndpointComponent {
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
