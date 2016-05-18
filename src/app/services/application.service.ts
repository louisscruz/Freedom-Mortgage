import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {ControlGroup} from '@angular/common';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ApplicationService {
  private apiUrl: string = 'http://localhost:3000';

  constructor(private http: Http) {}

  postApplication(application: ControlGroup) {
    let formattedApplication = this.mapFormToParams(application);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const url = this.apiUrl + '/api/applications/';
    return this.http.post(url, JSON.stringify(formattedApplication), {
      headers: headers
    })
    .map(res => res.json());
  }

  /*mapFormToParams(applyForm) {
    let form = applyForm.value;
    let application = {
      'application': {
        'loan_type': form.loanGroup.type,
        'loan_amount': form.loanGroup.amount,
        'borrower_attributes': {
          'first_name': form.borrowerGroup.firstName,
          'middle_name': form.borrowerGroup.middleName,
          'last_name': form.borrowerGroup.lastName,
          'birthdate': form.borrowerGroup.dob,
          'phone': form.borrowerGroup.phone,
          'email': form.borrowerGroup.email,
          'ssn': form.borrowerGroup.ssn,
          'marital_status': form.borrowerGroup.maritalStatus,
          'address_attributes': {
            'street_address': form.borrowerGroup.address.add,
            'city': form.borrowerGroup.address.city,
            'state': form.borrowerGroup.address.state,
            'zip': form.borrowerGroup.address.zip
          }
        }
      }
    };
    return application;
  }*/

  mapFormToParams(applyForm) {
    let form = applyForm.value;
    let application = {
      'application': {
        'loan_type': 'purchase',
        'loan_amount': 2500000,
        'borrower_attributes': {
          'first_name': 'Louis',
          'middle_name': 'Stephan',
          'last_name': 'Cruz',
          'birthdate': '01/01/1970',
          'phone': '1231231234',
          'email': 'test@me.com',
          'ssn': '123121234',
          'marital_status': 'married',
          //'address_attributes': {
            //'street_address': '1045 Mission Street',
            //'city': 'San Francisco',
            //'state': 'CA',
            //'zip': 94103
          //}
        }
      }
    };
    return application;
  }
}
