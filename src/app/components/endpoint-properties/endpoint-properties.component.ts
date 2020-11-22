import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-endpoint-properties',
  templateUrl: './endpoint-properties.component.html',
  styleUrls: ['./endpoint-properties.component.css']
})
export class EndpointPropertiesComponent implements OnInit {
  @Input() dataKey: any;
  @Input() dataVal: any;

  hasSubProps: boolean = false;
  isExpanded: boolean = false;

  constructor() { }

  onClick() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(): void {
    this.hasSubProps = this.dataVal.properties !== undefined;
  }

  ngOnChanges() {
  }

}
