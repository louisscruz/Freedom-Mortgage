import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ApplicationService {
  private apiUrl: string = 'http://localhost:3000';

  constructor(private http: Http) {}

  postApplication(application: FormGroup) {
    let formattedApplication = this.testMapFormToParams(application);
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
    const loanGroup = applyForm.find('loanGroup');
    const borrowerGroup = applyForm.find('borrowerGroup');
    const coborrowerGroup = applyForm.find('coborrowerGroup');
    const borrowerAdd = borrowerGroup.find('address');
    let application = {
      'application': {
        'loan_type': loanGroup.find('type').value,
        'loan_amount': loanGroup.find('amount').value,
        'borrower_attributes': {
          'first_name': borrowerGroup.find('firstName').value,
          'middle_name': borrowerGroup.find('middleName').value || null,
          'last_name': borrowerGroup.find('lastName').value,
          'birthdate': borrowerGroup.find('dob').value,
          'phone': borrowerGroup.find('phone').value,
          'email': borrowerGroup.find('email').value,
          'ssn': borrowerGroup.find('ssn').value,
          'marital_status': borrowerGroup.find('maritalStatus').value,
          'address_attributes': {
            'street_address': '1045 Mission Street',
            'city': 'San Francisco',
            'state': 'CA',
            'zip': 94103
          },
          'jobs_attributes': [
            {
              'self_employed': true,
              'company': 'acme inc',
              'phone': '9232342345',
              'years': 2,
              'months': 3,
              'years_in_field': 14,
              'address_attributes': {
                'street_address': '1045 Mission Street',
                'city': 'San Francisco',
                'state': 'CA',
                'zip': 94103
              }
            }
          ],
          'incomes': [
            {

            }
          ],
          'declarations_group_attributes': {
            'a': false,
            'b': false,
            'c': false,
            'd': false,
            'e': false,
            'f': false,
            'g': false,
            'h': false,
            'i': false,
            'j': false,
            'k': false,
            'l': false,
            'm': false
          },
          'opportunity_group_attributes': {
            'decline': true
          }
        },
        'coborrower_attributes': {
          'first_name': coborrowerGroup.find('firstName').value,
          'middle_name': coborrowerGroup.find('middleName').value || null,
          'last_name': coborrowerGroup.find('lastName').value,
          'birthdate': coborrowerGroup.find('dob').value,
          'phone': coborrowerGroup.find('phone').value,
          'email': coborrowerGroup.find('email').value,
          'ssn': coborrowerGroup.find('ssn').value,
          'address_attributes': {
            'street_address': '1045 Mission Street',
            'city': 'San Francisco',
            'state': 'CA',
            'zip': 94103
          },
          'jobs_attributes': [
            {
              'self_employed': true,
              'company': 'acme inc',
              'phone': '9232342345',
              'years': 2,
              'months': 3,
              'years_in_field': 14,
              'address_attributes': {
                'street_address': '1045 Mission Street',
                'city': 'San Francisco',
                'state': 'CA',
                'zip': 94103
              }
            }
          ],
          'declarations_group_attributes': {
            'a': false,
            'b': false,
            'c': false,
            'd': false,
            'e': false,
            'f': false,
            'g': false,
            'h': false,
            'i': false,
            'j': false,
            'k': false,
            'l': false,
            'm': false
          },
          'opportunity_group_attributes': {
            'decline': true
          }
        }
      }
    };
    return application;
  }

  testMapFormToParams(applyForm) {
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
          'address_attributes': {
            'street_address': '1045 Mission Street',
            'city': 'San Francisco',
            'state': 'CA',
            'zip': 94103
          },
          'jobs_attributes': [
            {
              'self_employed': true,
              'company': 'acme inc',
              'phone': '9232342345',
              'years': 2,
              'months': 3,
              'years_in_field': 14,
              'address_attributes': {
                'street_address': '1045 Mission Street',
                'city': 'San Francisco',
                'state': 'CA',
                'zip': 94103
              }
            }
          ],
          'declarations_group_attributes': {
            'a': false,
            'b': false,
            'c': false,
            'd': false,
            'e': false,
            'f': false,
            'g': false,
            'h': false,
            'i': false,
            'j': false,
            'k': false,
            'l': false,
            'm': false
          },
          'opportunity_group_attributes': {
            'decline': true
          }
        }
      }
    };
    return application;
  }
}
