import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GithubService } from 'src/app/services/github.service';
import { User } from 'src/app/models/user.model';
import { Subscription, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  loading = true;
  q: string;
  page: string;
  perPage: string;
  totalCount: number;
  maxPage: number;
  pages: number[] = [];
  users: User[] = [];
  subscriptions: Subscription[] = [];
  constructor(private route: ActivatedRoute, private router: Router, private git: GithubService) {}

  search(): void {
    this.subscriptions.push(
      this.git
        .getUsers(this.q, this.perPage, this.page)
        .pipe(
          tap(result => {
            this.totalCount = result.total_count;
            this.getUserDetails(result.items);
            // Api only supports getting page nr <= 100
            this.maxPage = Math.min(Math.ceil(this.totalCount / Number(this.perPage)), 100);
            this.fillPages();
            this.loading = false;
          })
        )
        .subscribe()
    );
  }
  fillPages(): void {
    this.pages = [];
    const lowPage = Number(this.page) > 5 ? Number(this.page) - 5 : 1;
    const highPage = this.maxPage - Number(this.page) > 5 ? Number(this.page) + 5 : this.maxPage;
    for (let i = lowPage; i <= highPage; i++) {
      this.pages.push(i);
    }
  }
  nextButtonDisabled(): boolean {
    return Number(this.page) >= this.maxPage;
  }
  prevButtonDisabled(): boolean {
    return Number(this.page) <= 1;
  }
  firstPage(): void {
    if (this.page !== '1') {
      this.page = '1';
      this.navigate();
    }
  }
  prevPage(): void {
    if (Number(this.page) > 1) {
      this.page = String(Number(this.page) - 1);
      this.navigate();
    }
  }
  nextPage(): void {
    if (Number(this.page) < this.maxPage) {
      this.page = String(Number(this.page) + 1);
      this.navigate();
    }
  }
  pageNumber(page: number): void {
    if (page > 0 && page < this.maxPage) {
      this.page = String(page);
      this.navigate();
    }
  }
  lastPage(): void {
    if (Number(this.page) !== this.maxPage) {
      this.page = String(this.maxPage);
      this.navigate();
    }
  }
  navigate(): void {
    const queryParams = {
      q: this.q,
      page: this.page,
      perPage: this.perPage
    };
    this.router.navigate(['users'], { queryParams });
  }
  getUserDetails(items: User[]): void {
    items.forEach(item => {
      const sub = this.git
        .getUser(item.login)
        .pipe(
          tap(user => {
            this.users.push(user);
            sub.unsubscribe();
          })
        )
        .subscribe();
    });
  }

  ngOnInit() {
    this.subscriptions.push(
      this.route.queryParams.subscribe((params: Params) => {
        console.log(params);
        this.q = params.q ? params.q : '';
        this.page = params.page ? params.page : 1;
        this.perPage = params.hasOwnProperty('per_page') ? params.per_page : '10';
        console.log(this.perPage);
        this.search();
      })
    );
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
