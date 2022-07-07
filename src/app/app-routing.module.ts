import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './components/recipes/recipes.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/compat/auth-guard';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { RecipeLayoutComponent } from './components/recipe-layout/recipe-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: AuthLayoutComponent,
    children: [{ path: '', component: LoginComponent }],
    ...canActivate(() => redirectLoggedInTo(['recipes'])),
  },
  {
    path: 'register',
    component: AuthLayoutComponent,
    children: [{ path: '', component: RegisterComponent }],
    ...canActivate(() => redirectLoggedInTo(['recipes'])),
  },
  {
    path: 'recipes',
    component: RecipeLayoutComponent,
    children: [{ path: '', component: RecipesComponent }],
    ...canActivate(() => redirectUnauthorizedTo(['login'])),
  },
  {
    path: 'recipes/:id',
    component: RecipeLayoutComponent,
    children: [{ path: '', component: RecipeDetailsComponent }],
    ...canActivate(() => redirectUnauthorizedTo(['login'])),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
