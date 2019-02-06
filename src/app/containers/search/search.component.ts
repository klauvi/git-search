import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  perPage = '10';
  searchTerm: string;
  pageOptions = ['10', '20', '30'];

  constructor(private router: Router) {}

  navigate(): void {
    this.router.navigate(['users'], {
      queryParams: { q: this.searchTerm, per_page: this.perPage }
    });
  }
  ngOnInit() {}
}
