import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreeviewService {
  private lastSelectedCompID = new BehaviorSubject<string>("");
  currentSelectedCompID = this.lastSelectedCompID.asObservable()

  constructor() {}
  
  setLastSelectedCompID(aLastHighlighted: string): void {
    this.lastSelectedCompID.next(aLastHighlighted);
  }
}
