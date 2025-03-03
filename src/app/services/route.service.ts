import { Injectable } from '@angular/core';
import { routes } from '../app.routes';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  getRoutes() {
    return routes.filter(route => route.path && route.path !== '**');
  }
}
