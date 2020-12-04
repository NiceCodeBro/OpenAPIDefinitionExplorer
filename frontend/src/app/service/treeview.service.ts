import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * TreeviewService which is used to manage remote states
 * of a treeview, node components
 **/
export class TreeviewService {
  private lastSelectedCompID = new BehaviorSubject<string>('');
  currentSelectedCompID = this.lastSelectedCompID.asObservable();

  setLastSelectedCompID(aLastHighlighted: string): void {
    this.lastSelectedCompID.next(aLastHighlighted);
  }
}
