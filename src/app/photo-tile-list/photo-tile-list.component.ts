import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../shared/shared-data.service';
import { PhotoModel } from '../shared/model/photo-model';
import { Observable } from 'rxjs/internal/Observable';
import { HttpService } from '../shared/http.service';
import { AppSettings } from '../app-settings';
import { isArray } from 'util';

@Component({
  selector: 'app-photo-tile-list',
  templateUrl: './photo-tile-list.component.html',
  styleUrls: ['./photo-tile-list.component.scss']
})
export class PhotoTileListComponent implements OnInit {

  public selectedAlbumsPhotosCount: number = 0;
  public photosList = new Array<PhotoModel>();
  public sortType: string = '';

  constructor(private httpService: HttpService, private sharedDataService: SharedDataService) { }

  public ngOnInit() {
    this.sharedDataService.selectedAlbums.subscribe(albums => {
      if (albums) {
        this.photosList = new Array<PhotoModel>();
        this.selectedAlbumsPhotosCount = 0;
        this.sortType = '';
        albums.forEach((val) => {
          if (val.checked) {
            this.selectedAlbumsPhotosCount += val.photosCount;
            this.fetchPhotoByAlbumId(val.id).subscribe(photos => {
              if (isArray(photos)) {
                this.photosList.push(...photos);
              }
            }, (error) => {
              throw error;
            });
          }
        });
      }
    }, (error) => {
      throw error;
    });
    this.sharedDataService.selectedUser.subscribe(user => {
      if (user) {
        this.selectedAlbumsPhotosCount = 0;
        this.sortType = '';
        this.photosList = new Array<PhotoModel>();
      }
    }, (error) => {
      throw error;
    });
  }

  private fetchPhotoByAlbumId(albumId: number): Observable<PhotoModel[]> {
    return this.httpService.get(AppSettings.API_ENDPOINT_URL + AppSettings.GET_PHOTO_LIST_SERVICE, albumId);
  }

  public doSortUsersList(sortType: string) {
    this.sortType = sortType;
    this.photosList.sort(function (current, next) {
      return sortType === 'a-z' ? current.title.localeCompare(next.title) : next.title.localeCompare(current.title);
    });
  }
}
