import { Component, Input } from '@angular/core';

/**
 * Component which can be used to show an arrow icon in two way
 * 1) Facing right
 * 2) Facing down
 **/
@Component({
  selector: 'app-arrow',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.css']
})
export class ArrowComponent {
  /**
   * According to value, arraw icon is rotated.
   **/
  @Input() isExpanded: boolean;
}
