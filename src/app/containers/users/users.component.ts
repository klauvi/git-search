import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GithubService } from 'src/app/services/github.service';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

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
  users: User[];
  subscriptions: Subscription[] = [];
  constructor(private route: ActivatedRoute, private router: Router, private git: GithubService) {}

  search(): void {
    this.subscriptions.push(
      this.git
        .getUsers(this.q, this.perPage, this.page)
        .pipe(
          tap(result => {
            this.totalCount = result.total_count;
            this.users = result.items;
            this.maxPage = Math.ceil(this.totalCount / Number(this.perPage));
            this.loading = false;
          })
        )
        .subscribe()
    );
  }

  nextButtonEnabled(): boolean {
    return Number(this.page) < this.maxPage;
  }
  prevButtonEnabled(): boolean {
    return Number(this.page) > 1;
  }
  nextPage(): void {
    if (Number(this.page) < this.maxPage) {
      this.page = String(Number(this.page) + 1);
      this.navigate();
    }
  }
  prevPage(): void {
    if (Number(this.page) > 1) {
      this.page = String(Number(this.page) - 1);
      this.navigate();
    }
  }
  pageNumber(page: number): void {
    if (page > 0 && page < this.maxPage) {
      this.page = String(page);
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

  ngOnInit() {
    this.subscriptions.push(
      this.route.queryParams.subscribe((params: Params) => {
        this.q = params.q ? params.q : '';
        this.page = params.page ? params.page : 1;
        this.perPage = params.per_page ? params.per_page : '10';
        this.search();
      })
    );
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
