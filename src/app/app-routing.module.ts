import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'userinfo',
    data: { preload: false },
    loadChildren: () =>
      import('./user-data/user-data.module').then(m => m.UserDataModule)
  },
  {
    path: 'subjects',
    data: { preload: true },
    loadChildren: () =>
      import('./subject/subject.module').then(m => m.SubjectModule)
  },
  {
    path: 'strategies',
    data: { preload: false },
    loadChildren: () =>
      import('./strategy/strategy.module').then(m => m.StrategyModule)
  },
  {
    path: 'categories',
    data: { preload: false },
    loadChildren: () =>
      import('./categories/categories.module').then(m => m.CategoriesModule)
  },
  { path: 'logout', redirectTo: 'home', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  declarations: [HomeComponent]
})
export class AppRoutingModule { }
