import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CustomTableComponent } from '../../components/custom-table/custom-table.component';
import { Sort } from '@angular/material/sort';
import { IHistory } from './types';
import { CustomButtonComponent } from '../../components/custom-button/custom-button.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    BaseChartDirective,
    MatIconModule,
    CommonModule,
    CustomTableComponent,
    CustomButtonComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
})
export class DashboardComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      // datalabels: {
      //   anchor: 'end',
      //   align: 'end',
      // },
    },
  };
  public barChartType = 'bar' as const;

  public barChartData: ChartData<'bar'> = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    ],
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public lineChartType = 'line' as const;

  public lineChartData: ChartData<'line'> = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    ],
  };

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  public doughnutChartType = 'doughnut' as const;

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  public doughnutChartLegend: { label: string; color: string }[] = [];

  ngOnInit() {
    this.doughnutChartLegend = [
      { label: 'Red', color: 'rgba(255, 99, 132, 0.8)' },
      { label: 'Blue', color: 'rgba(54, 162, 235, 0.8)' },
      { label: 'Yellow', color: 'rgba(255, 206, 86, 0.8)' },
      { label: 'Green', color: 'rgba(75, 192, 192, 0.8)' },
      { label: 'Purple', color: 'rgba(153, 102, 255, 0.8)' },
      { label: 'Orange', color: 'rgba(255, 159, 64, 0.8)' },
    ];
  }

  public cardClasses =
    'w-1/4 h-32 border rounded-md p-3 border-gray-300 bg-white';
  public iconClasses = 'text-3xl';
  public textClasses = 'ml-11 text-base';
  public chartContainerClasses =
    'bg-white w-full max-w-2xl h-96 mx-auto bg-gray-100 p-5 border border-gray-300 shadow-md rounded-lg mt-5';

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40,
    ];

    this.chart?.update();
  }

  sampleData: IHistory[] = [
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

  onSortChange(sort: Sort) {
    this.activeSort = sort;
  }
}
