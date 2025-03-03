import { Component } from '@angular/core';
import { CustomTableComponent } from '../../components/custom-table/custom-table.component';
import { CustomPaginatorComponent } from '../../components/custom-paginator/custom-paginator.component';
import { IUser } from './types';
import { Sort } from '@angular/material/sort';
import { CustomButtonComponent } from '../../components/custom-button/custom-button.component';
import { ActivatedRoute, Router } from '@angular/router';

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
export class UsersManagementComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  sampleData: IUser[] = [
    {
      name: 'Test User 1',
      fullName: 'Test',
      email: 'Test@mail.ru',
      homeAddress: 'test',
      birthDate: '19-08-2000',
    },
    {
      name: 'Test User 2',
      fullName: 'Test',
      email: 'Test2@mail.ru',
      homeAddress: 'test',
      birthDate: '',
    },
    {
      name: 'Test User 1',
      fullName: 'Test',
      email: 'Test@mail.ru',
      homeAddress: '',
      birthDate: '',
    },
    {
      name: 'Test User 1',
      fullName: 'Test',
      email: 'Test@mail.ru',
      homeAddress: '',
      birthDate: '',
    },
    {
      name: 'Test User 1',
      fullName: 'Test',
      email: 'Test@mail.ru',
      homeAddress: '',
      birthDate: '',
    },
    {
      name: 'Test User 1',
      fullName: 'Test',
      email: 'Test@mail.ru',
      homeAddress: '',
      birthDate: '',
    },
    {
      name: 'Test User 1',
      fullName: 'Test',
      email: 'Test@mail.ru',
      homeAddress: '',
      birthDate: '',
    },
    {
      name: 'Test User 1',
      fullName: 'Test',
      email: 'Test@mail.ru',
      homeAddress: '',
      birthDate: '',
    },
    {
      name: 'Test User 1',
      fullName: 'Test',
      email: 'Test@mail.ru',
      homeAddress: 'test',
      birthDate: '19-08-2000',
    },
    {
      name: 'Test User 1',
      fullName: 'Test',
      email: 'Test@mail.ru',
      homeAddress: 'test',
      birthDate: '19-08-2000',
    },
    {
      name: 'Test User 1',
      fullName: 'Test',
      email: 'Test@mail.ru',
      homeAddress: 'test',
      birthDate: '19-08-2000',
    },
    {
      name: 'Test User 1',
      fullName: 'Test',
      email: 'Test@mail.ru',
      homeAddress: 'test',
      birthDate: '19-08-2000',
    },
    {
      name: 'Test User 1',
      fullName: 'Test',
      email: 'Test@mail.ru',
      homeAddress: 'test',
      birthDate: '19-08-2000',
    },
  ];
  displayedColumns: string[] = [
    'name',
    'fullName',
    'email',
    'homeAddress',
    'birthDate',
  ];
  pipeArgs = {
    birthDate: ['DD-MM-YYYY'],
  };
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 20];
  sortFeature = true;
  activeSort: Sort = { active: '', direction: '' };

  get paginatedData(): IUser[] {
    let data = this.sampleData.slice();
    if (this.activeSort.active && this.activeSort.direction) {
      data = data.sort((a, b) => {
        const isAsc = this.activeSort.direction === 'asc';
        switch (this.activeSort.active) {
          case 'name':
          case 'fullName':
          case 'email':
          case 'homeAddress':
            return this.compare(
              a[this.activeSort.active],
              b[this.activeSort.active],
              isAsc
            );
          case 'birthDate':
            return this.compare(
              new Date(a.birthDate),
              new Date(b.birthDate),
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
    this.router.navigate(['/form'], { queryParams: { showBack: true, sidebarTitle: 'Add User' } });
  }
}
