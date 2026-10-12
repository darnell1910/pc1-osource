import {Routes} from '@angular/router';
import {Home} from './shared/presentation/views/home/home';

const pageNotFound = () => import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound);
const sportsCentersRoutes = () => import('./sports-centers/sports-centers.routes').then(m => m.sportsCentersRoutes);
const baseTitle = 'UrbanFit';

/**
 * Root route configuration that composes the bounded context routes.
 */
export const routes: Routes = [
  {path: 'home', component: Home, title: `${baseTitle} - Home`},
  {path: 'reservations', loadChildren: sportsCentersRoutes},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Page Not Found`}
];
