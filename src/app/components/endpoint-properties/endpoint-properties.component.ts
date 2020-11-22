import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-endpoint-properties',
  templateUrl: './endpoint-properties.component.html',
  styleUrls: ['./endpoint-properties.component.css']
})
export class EndpointPropertiesComponent implements OnInit {
  @Input() dataKey: any;
  @Input() dataVal: any;
  hasProperties: boolean = false;
  isExpanded: boolean = false;


  constructor() { }

  onClick() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(): void {
    this.hasProperties = this.dataVal.properties !== undefined;
  }
  ngOnChanges() {
    console.log(this.dataKey, this.dataVal)
  }
}
