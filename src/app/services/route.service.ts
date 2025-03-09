import { Injectable } from '@angular/core';
import { routes } from '../app.routes';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  constructor(private authService: AuthService) {}

  async getRoutes() {
    const user = await firstValueFrom(this.authService.user$);
    const isLoggedIn = !!user;
    let route = [
      ...routes.filter((route) => route.path && route.path !== '**'),
    ];
    if (isLoggedIn) {
      route = routes.filter((route) => route.path !== 'login-page'); // Filter out login
    }
    return route;
  }
}
