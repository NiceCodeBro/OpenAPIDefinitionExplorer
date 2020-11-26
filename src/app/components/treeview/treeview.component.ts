import { Component, Input} from '@angular/core';

@Component({
  selector: 'treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.css']
})
export class TreeViewComponent {
  @Input() props: any;
  @Input() path: string[];
  isExpanded: boolean = false;

  onClick() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnChanges() {
    if (this.path.length > 0 && this.path[0] === this.props.name) {
      this.isExpanded = true;
      this.path.shift();
    } else {
      this.isExpanded = false;
    }
  }
}
