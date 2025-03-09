import {
  Component,
  ViewChild,
  AfterViewInit,
  OnInit,
  Output,
  EventEmitter,
  inject,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  RouterModule,
  Router,
  ActivatedRoute,
  NavigationExtras,
  NavigationEnd,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouteService } from '../../services/route.service';
import { Location } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    MatMenuModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  @Output() toggled = new EventEmitter<void>();
  routes: any[] = [];
  currentTitle: string = '';
  showBack: boolean = false;
  private snackBar = inject(MatSnackBar);

  constructor(
    private routeService: RouteService,
    private router: Router,
    private location: Location,
    private authService: AuthService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      const state = navigation.extras.state as {
        showBack: boolean;
        sidebarTitle: string;
        userId: string;
      };
      this.showBack = state.showBack;
      this.currentTitle = state.sidebarTitle;
    }
  }

  async ngOnInit() {
    this.updateStateFromNavigation(); // Initial state retrieval
    await this.updateRoutes();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(async () => {
        this.updateStateFromNavigation();
        await this.updateRoutes(); // Await the route update
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

  async updateRoutes() {
    this.routes = await this.routeService.getRoutes();
    this.routes = this.routes.filter((e) => e.title != undefined);
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

  onProfileAction(action: string) {
    if (action === 'logout') {
      this.authService.logout();
      this.snackBar.open('Logout successfully!', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      this.router.navigate(['/login-page']);
    } else if (action === 'profile') {
      const navigationExtras: NavigationExtras = {
        state: {
          showBack: true,
          sidebarTitle: 'User Information',
        },
      };
      this.router.navigate(['/user-info'], navigationExtras);
    }
  }

  updateStateFromNavigation() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      const state = navigation.extras.state as {
        showBack: boolean;
        sidebarTitle: string;
        userId: string;
      };
      this.showBack = state.showBack;
      this.currentTitle = state.sidebarTitle;
    } else {
      this.showBack = false;
      this.currentTitle = this.getCurrentTitleFromRoute();
    }
  }
  getCurrentTitleFromRoute() {
    const currentRoute = this.router.routerState.snapshot.root.firstChild;
    if (currentRoute) {
      const routeData = this.routes.find(
        (route) => route.path === currentRoute.routeConfig?.path
      );
      return routeData ? routeData.title : '';
    }
    return '';
  }
}
