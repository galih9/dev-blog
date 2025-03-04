import {
  Component,
  ViewChild,
  AfterViewInit,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouteService } from '../../services/route.service';
import { Location } from '@angular/common';
import { RouterTestingModule } from "@angular/router/testing";
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule,
    RouterTestingModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  @Output() toggled = new EventEmitter<void>();
  routes: any[];
  currentTitle: string = '';
  showBack: boolean = false;

  constructor(private routeService: RouteService, private router: Router, private activatedRoute: ActivatedRoute, private location: Location) {
    this.routes = this.routeService
      .getRoutes()
      .filter((e) => e.title != undefined);
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['showBack'] === 'true' || params['showBack'] === true) {
        this.showBack = true;
        if (params['sidebarTitle']) {
          this.currentTitle = params['sidebarTitle'];
        }
      } else {
        this.showBack = false;
        // Optionally reset the title to default, e.g. from route information
      }
    });
  }

  ngAfterViewInit() {
    this.router.events.subscribe(() => {
      if (!this.showBack) {
        const currentRoute = this.router.routerState.snapshot.root.firstChild;
        if (currentRoute) {
          const routeData = this.routes.find(
            (route) => route.path === currentRoute.routeConfig?.path
          );
          this.currentTitle = routeData ? routeData.title : '';
        }
      }
    });
  }

  toggleSidenav() {
    this.sidenav.toggle();
    this.toggled.emit();
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  toggleDrawer(route: any) {
    route.open = !route.open;
  }
  
  navigateBack() {
    this.location.back();
    // Clear query parameters after navigating back
    this.location.replaceState(this.router.url.split('?')[0]);
  }
}
