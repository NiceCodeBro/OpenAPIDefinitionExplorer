import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-endpoint',
  templateUrl: './endpoint.component.html',
  styleUrls: ['./endpoint.component.css']
})
export class EndpointComponent implements OnInit {
  @Input() endPoint: any;
  @Input() properties: any;
  isExpanded: boolean = false;

  constructor() { }

  onClick() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(): void {
  }

}
