import { User } from './users/user.interface';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PlantsModule } from './plants/plants.module';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';
import { PlantsResolverService } from './plants/plants-resolver.service';
import { UserResolverService } from './users/user.resolver.service';
import { PlantResolverService } from './plants/plant.resolver.service';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PlantsModule,
    UsersModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    PlantsResolverService,
    PlantResolverService,
    UserResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
