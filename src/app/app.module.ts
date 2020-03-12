import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UiModule } from './shared/ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { SearchComponent } from './pages/home/search/search.component';
import { MovieComponent } from './pages/movie/movie.component'
import { TokenInterceptorService } from './core/services/token-interceptor.service';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslationService } from './core/services/translation.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CurrentTimePipe } from './shared/pipes/current-time.pipe';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { EditMovieComponent } from './pages/edit-movie/edit-movie.component';
import { PersonComponent } from './pages/person/person.component';
import { AgePipe } from './shared/pipes/age.pipe';
import { EditPersonComponent } from './pages/edit-person/edit-person.component'
import { UserComponent } from './pages/user/user.component'
import { AdvencedSearchComponent } from './pages/advenced-search/advenced-search.component';
import { AddPersonComponent } from './pages/add-person/add-person.component';
import { AddMovieComponent } from './pages/add-movie/add-movie.component';


export function translateInitializerFactory(
  translateService: TranslateService,
  translationService: TranslationService,
  injector: Injector
) {
  return ():Promise<void> => {
    return translationService.init(translateService, injector);
  }
}

export function HttpLoaderFactory(http:HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(
    http,
    './assets/i18n/',
    '.json'
  );
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SearchComponent,
    MovieComponent,
    CurrentTimePipe,
    CreateUserComponent,
    EditMovieComponent,
    PersonComponent,
    AgePipe,
    EditPersonComponent,
    UserComponent,
    AdvencedSearchComponent,
    AddPersonComponent,
    AddMovieComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: { provide:TranslateLoader, useFactory: HttpLoaderFactory, deps:[HttpClient] }
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true},
    {provide: APP_INITIALIZER, useFactory: translateInitializerFactory, deps:[TranslateService, TranslationService, Injector], multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
