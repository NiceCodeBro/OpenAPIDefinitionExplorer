import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getHostName } from './apiconfig';

@Injectable({
  providedIn: 'root'
})
/**
 * TreeviewService which is used to manage global state of application
 * and api calls
 **/
export class TreeviewService {
  private lastSelectedCompID = new BehaviorSubject<string>('');
  currentSelectedCompID = this.lastSelectedCompID.asObservable();

  constructor(private http: HttpClient) {}

  setLastSelectedCompID(aLastHighlighted: string): void {
    this.lastSelectedCompID.next(aLastHighlighted);
  }

  getParsedOpenAPIFile(fileContent: string): any {
    return this.http.post(
      `${getHostName()}/parser/swaggerparser`,
      { filecontent: fileContent },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }
}
