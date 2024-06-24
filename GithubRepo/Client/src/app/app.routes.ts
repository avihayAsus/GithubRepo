import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BookmarksPageComponent } from './pages/bookmarks-page/bookmarks-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent, pathMatch: 'full' },
    { path: 'bookmarks', component: BookmarksPageComponent, pathMatch: 'full'}
];
