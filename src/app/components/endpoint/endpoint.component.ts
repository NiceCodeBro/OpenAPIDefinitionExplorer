import { Component, OnInit, Input} from '@angular/core';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-endpoint',
  templateUrl: './endpoint.component.html',
  styleUrls: ['./endpoint.component.css']
})
export class EndpointComponent implements OnInit {
  @Input() name: string;
  @Input() props: any;
  @Input() typedEPName: string;
  @Input() typedEPTail: string;
  isExpanded: boolean = false;

  constructor() { }

  onClick() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    //console.log(this.typedEPName, this.typedEPTail)
    if (this.typedEPName === this.name) {
      this.isExpanded = true;
    } else {
      this.isExpanded = false;
    }
  }
  
}
