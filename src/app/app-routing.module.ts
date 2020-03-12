import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginGuard } from './core/guards/login.guard';
import { MovieComponent } from './pages/movie/movie.component';
import { EditMovieComponent} from './pages/edit-movie/edit-movie.component';
import { MovieResolver } from './core/resolver/movie-resolver';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { PersonComponent } from './pages/person/person.component';
import { PersonResolver } from './core/resolver/person-resolver';
import { EditPersonComponent } from './pages/edit-person/edit-person.component';
import { UserComponent } from './pages/user/user.component';
import { AdvencedSearchComponent } from './pages/advenced-search/advenced-search.component';
import { AddMovieComponent } from './pages/add-movie/add-movie.component';
import { AddPersonComponent } from './pages/add-person/add-person.component';


const routes: Routes = [
  {
    path: '',
    redirectTo : 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'login/:id',
    component: LoginComponent,
    canActivate: [LoginGuard],
    pathMatch: 'full'
  },
  {
    path: 'person/:id',
    component: PersonComponent,
    resolve: {
      person: PersonResolver
    }
  },
  {
    path: 'createAccount',
    component: CreateUserComponent
  },
  {
    path: 'user/:username',
    component: UserComponent
  },
  {
    path: 'advencedSearch',
    component: AdvencedSearchComponent
  },
  {
    path: 'movie/:id',
    component: MovieComponent,
    resolve: {
      movie: MovieResolver
    }
  },
  {
    path: 'addMovie',
    component: AddMovieComponent
  },
  {
    path: 'addPerson',
    component: AddPersonComponent
  },
  {
    path: 'editMovie/:id',
    component: EditMovieComponent
  },
  {
    path: 'editPerson/:id',
    component: EditPersonComponent
  },
  {
    path: '**',
    redirectTo : 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
