import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';

interface Company {
  CompanyName: string;
  ContactName: string;
  Phone: string;
  Address: string;
  TotalOrders: number;
}

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
  standalone: true,
  // Import CommonModule for ngIf/ngFor, FormsModule for two-way binding,
  // and HttpClientModule for making HTTP requests.
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class SearchPageComponent {
  companyName = '';
  companyNameSearchType = 'equal';
  contactName = '';
  contactNameSearchType = 'equal';
  phone = '';
  companies: Company[] = [];
  searchUrl = 'http://localhost:3000/api/companies';

  // Our search displays
  searchTypes = [
    { value: 'equal', display: 'Equal' },
    { value: 'startwith', display: 'StartWith' },
    { value: 'endwith', display: 'EndWith' },
    { value: 'middle', display: 'Middle' }
  ];

  constructor(private http: HttpClient) {}

  search() {
    let params = new HttpParams();
    if (this.companyName) {
      params = params.set('companyName', this.companyName)
                     .set('companyNameSearchType', this.companyNameSearchType);
    }
    if (this.contactName) {
      params = params.set('contactName', this.contactName)
                     .set('contactNameSearchType', this.contactNameSearchType);
    }
    if (this.phone) {
      params = params.set('phone', this.phone);
    }
    this.http.get<Company[]>(this.searchUrl, { params })
      .subscribe(
        data => { this.companies = data; },
        error => { console.error('Error fetching companies', error); }
      );
  }
}
