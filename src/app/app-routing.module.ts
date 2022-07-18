import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { IsLoggedIn } from '../app/utils/is-Logged-In'

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule),
    resolve: [IsLoggedIn]

  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./components/categories/categories.module').then( m => m.CategoriesPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'create-category',
    loadChildren: () => import('./components/create-category/create-category.module').then( m => m.CreateCategoryPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'product',
    loadChildren: () => import('./components/product/product.module').then( m => m.ProductPageModule)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
