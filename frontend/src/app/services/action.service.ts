import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private apiUrl = 'http://localhost:3000/actions';

  constructor(private http: HttpClient) {}

  getActions(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addAction(action: any): Observable<any> {
    return this.http.post(this.apiUrl, action);
  }
}
