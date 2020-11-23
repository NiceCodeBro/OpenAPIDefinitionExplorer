import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-endpoint-properties',
  templateUrl: './endpoint-properties.component.html',
  styleUrls: ['./endpoint-properties.component.css']
})
export class EndpointPropertiesComponent implements OnInit {
  @Input() typedEPTail: string;
  @Input() dataKey: string;
  @Input() dataVal: string;

  typedEPTailRest: string;
  hasSubProps: boolean = false;
  isExpanded: boolean = false;

  constructor() { }

  onClick() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(): void {
    this.hasSubProps = this.dataVal['properties'] !== undefined;
    this.handleTypedTail();
  }

  ngOnChanges() {
    this.handleTypedTail();
  }

  handleTypedTail() {
    if (this.typedEPTail.length) {
      var splittedTail: Array<string> = this.typedEPTail.split(".");

      if (splittedTail && splittedTail.length) {
        var dataKey = splittedTail[0];
        if (dataKey === this.dataKey) {
          this.isExpanded = true;
        } else { 
          this.isExpanded = false;
        }
        this.typedEPTailRest = splittedTail.splice(1).join('.');
      }
    }
  }
}
