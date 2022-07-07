# Présentation du projet

Pour le projet Angular - Firebase, j'ai crée un application web de recettes de cuisine, que l'on peut décomposer en 2 parties :

1. Authentification
   1. Connexion avec mail & mot passe ou avec Google OAuth
   2. Inscription avec mail & mot de passe ou avec Google OAuth
2. Recettes : (Accessible après authentification)
   1. Liste de recette depuis l'api [Tasty](https://rapidapi.com/apidojo/api/tasty)
   2. Ingrédient et instructions de la recette sélectionnée

# Documentation

### Création du projet - Partie Angular

- Ouvrir un terminal

```bash
ng new angular-project --skip-install
	? Would you like to add Angular routing? : Y
	? Which stylesheet format would you like to use? CSS
cd angular-project
yarn (ou npm install)
ng serve
```

- Ajout du CDN de Bootstrap et Bootstrap Icons pour les styles et le côté responsive.

### Création du projet - Partie Firebase

1. Accéder à la [console de Firebase](https://console.firebase.google.com/u/0/)
2. Créer un nouveau projet et lui attribuer un nom
3. Activer l'authentification avec mail & mot de passe et Google OAuth

### Installation et configuration de la connexion Angular - Firebase

- Ouvrir un nouveau terminal

```bash
ng add @angular/fire
	The package @angular/fire@7.4.1 will be installed and executed. Would you like to proceed? : Y
	What features would you like to setup? : Authentication - Firestore
	Which Firebase account would you like to use? : ...@gmail.com
	Please select a project : angular-project
	Please select an app : angular-project
```

- Dans le fichier `app.module.ts`, ajoutez dans le tableau `imports` le module `AngularFireModule` comme suit:

```typescript
...
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
  ...
  imports: [
    ...
    AngularFireModule.initializeApp(environment.firebase),
  ],
  ...
})
export class AppModule {}
```

### Création des Components

Ouvrir le terminal

- Connexion `ng g c components/login`
  - Gestion des erreurs lors du remplissage du formulaire
  - Affichage des erreurs de Firebase; ex : Mot de passe erroné, utilisateur inconnu etc... 
- Inscription `ng g c components/register`
  - Gestion des erreurs lors du remplissage du formulaire
  - Affichage des erreurs de Firebase; ex : Email utilisé, etc... 
- Plan des pages de connexion et inscription  `ng g c components/authLayout`
- Liste des recettes  `ng g c components/recipes`
- Details de la recette choisie  `ng g c components/recipeDetails`
- Plan des pages après connexion  `ng g c components/recipeLayout`

### Création des services

Dans le terminal

- Service d'authentification `ng g s shared/auth`
  - Méthode de connexion avec email & mot de passe `login(email: string, password: string)`
  - Méthode de création de compte avec email & mot de passe `register(email: string, password: string)`
  - Méthode de déconnexion `logout()`
  - Méthode de connexion avec Google OAuth `signInWithGoogle()`


### Créations des routes

- Utilisation de `canActivate()`, `redirectLoggedInTo`et  `redirectUnauthorizedTo` pour protéger les routes :
  - `redirectLoggedInTo(['recipes'])` : redirectionne l'utilisateur connecté vers la page des recettes
  - `redirectUnauthorizedTo(['login'])` : redirectionne les utilisateurs non connecté vers la page de connexion

```javascript
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
```

### API des recettes

1. Création d'un compte sur [RapidApi](https://rapidapi.com/)

2. Inscription à l'api des recettes [Tasty](https://rapidapi.com/apidojo/api/tasty/)

3. Ajout de `HttpClientModule`  comme suit pour pouvoir faire des requêtes :
   ```javascript
   ...
   import { HttpClientModule } from '@angular/common/http';
   
   @NgModule({
     ...
     imports: [
       BrowserModule,
       HttpClientModule,
       ...
     ],
     ...
   })
   export class AppModule {}
   ```

4. Modifier `recipes.component.ts` pour chercher les recettes depuis l'api :
   ```javascript
   ...
   import { HttpClient } from '@angular/common/http';
   
   ...
     async getData() {
       const url = 'https://tasty.p.rapidapi.com/recipes/list';
       const options = {
         params: {
           from: Math.floor(Math.random() * 399),
           size: '20',
           tags: 'under_45_minutes',
         },
         headers: {
           'X-RapidAPI-Key': '47e6d18d5bmsheb75ec393d80943p13a796jsn38fb48ea17a6',
           'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
         },
       };
   
       await this.http.get<any>(url, options).subscribe((response) => {
         this.recipes = response.results;
       });
     }
   ...
   ```

5. Modifier `recipe-details.component.ts` pour chercher les instructions et ingrédients de la recette choisie à l'aide de `id`:
   ```javascript
   ...
   import { HttpClient } from '@angular/common/http';
   import { ActivatedRoute } from '@angular/router';
   ...
     async getData() {
       const url = 'https://tasty.p.rapidapi.com/recipes/get-more-info';
       const options = {
         params: { id: this.id },
         headers: {
           'X-RapidAPI-Key': '47e6d18d5bmsheb75ec393d80943p13a796jsn38fb48ea17a6',
           'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
         },
       };
   
       this.http.get<any>(url, options).subscribe((response) => {
         this.recipe = response;
       });
     }
   ...
   ```

## Déployer l'application

1. Dans le terminal : `ng build` pour créer un build de l'application
2. Se connecter à un hébergeur, [Netlify](https://www.netlify.com/) par exemple, et y mettre le dossier `dist/angular-project` généré durant l'étape précédente.