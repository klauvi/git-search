import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatCardModule,
  MatTableModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

const materialModules = [
  MatCardModule,
  MatSelectModule,
  MatTableModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  CdkTableModule
];

import { SearchComponent } from './containers/search/search.component';
import { UsersComponent } from './containers/users/users.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
  declarations: [AppComponent, SearchComponent, UsersComponent, UserComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ...materialModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
