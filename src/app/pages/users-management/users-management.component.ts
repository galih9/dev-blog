import { Component, inject, OnInit } from '@angular/core';
import { CustomTableComponent } from '../../components/custom-table/custom-table.component';
import { CustomPaginatorComponent } from '../../components/custom-paginator/custom-paginator.component';
import { Sort } from '@angular/material/sort';
import { CustomButtonComponent } from '../../components/custom-button/custom-button.component';
import { UsersService } from '../../services/users.service';
import { Observable } from 'rxjs';
import { IUser } from '../../types/article';

@Component({
  selector: 'app-users-management',
  standalone: true,
  imports: [
    CustomTableComponent,
    CustomPaginatorComponent,
    CustomButtonComponent,
  ],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.css',
})
export class UsersManagementComponent implements OnInit {
  constructor() {}

  sampleData: IUser[] = [];
  displayedColumns: string[] = [
    'uid',
    'displayName',
    'email',
    'createdAt',
    'lastLogin',
  ];
  pipeArgs = {
    createdAt: ['DD/MM/YYYY, HH:mm:ss'],
    lastLogin: ['DD/MM/YYYY, HH:mm:ss'],
  };
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 20];
  sortFeature = true;
  activeSort: Sort = { active: '', direction: '' };

  users$: Observable<IUser[]> | undefined;
  private userService = inject(UsersService);

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
    this.users$.subscribe((users) => {
      this.sampleData = users;
    });
  }

  get paginatedData(): IUser[] {
    let data = this.sampleData.slice();
    if (this.activeSort.active && this.activeSort.direction) {
      data = data.sort((a, b) => {
        const isAsc = this.activeSort.direction === 'asc';
        switch (this.activeSort.active) {
          case 'uid':
          case 'displayName':
          case 'email':
            return this.compare(
              a[this.activeSort.active],
              b[this.activeSort.active],
              isAsc
            );
          case 'createdAt':
            return this.compare(
              new Date(a.createdAt),
              new Date(b.createdAt),
              isAsc
            );
          case 'lastLogin':
            return this.compare(
              new Date(a.lastLogin),
              new Date(b.lastLogin),
              isAsc
            );
          default:
            return 0;
        }
      });
    }
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    return data.slice(start, end);
  }

  compare(a: any, b: any, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onPageChange(event: { pageIndex: number; pageSize: number }) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  onSortChange(sort: Sort) {
    this.activeSort = sort;
  }

  navigateToAddUser = () => {
    // this.router.navigate(['/form'], {
    //   queryParams: { showBack: true, sidebarTitle: 'Add User' },
    // });
  };
}
