import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { PhotoTileListComponent } from './photo-tile-list/photo-tile-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppService } from './app.service';
import { MatCheckboxModule, MatProgressSpinnerModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchFilterPipe } from './shared/pipe/search-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    AlbumListComponent,
    PhotoTileListComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatInputModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: getSolution, deps: [AppService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getSolution(appService: AppService) {
  return () => appService.loadConfig();
}
