import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ApplicationService {
  private apiUrl: string = 'http://localhost:3000';
  constructor(private http: Http) {}
  postApplication(application: any) {
    console.log(application.value)
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const url = this.apiUrl + '/api/applications';
    return this.http.post(url, JSON.stringify(application.value), {
      headers: headers
    })
    .map(res => res.json());
  }
}
