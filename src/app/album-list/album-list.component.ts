import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../shared/shared-data.service';
import { HttpService } from '../shared/http.service';
import { AppSettings } from '../app-settings';
import { UserModel } from '../shared/model/user-model';
import { Observable } from 'rxjs/internal/Observable';
import { AlbumModel } from '../shared/model/album-model';
import { isArray } from 'util';
import { MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit {

  public selectedUser: UserModel = new UserModel();
  public albumList = new Array<AlbumModel>();
  public isSelectAllChecked: boolean = false;

  constructor(private httpService: HttpService, private sharedDataService: SharedDataService) { }

  public ngOnInit() {
    this.sharedDataService.selectedUser.subscribe(user => {
      if (user) {
        this.isSelectAllChecked = false;
        this.fetchAlbumListByUserId(user.userid).subscribe(albums => {
          this.albumList = new Array<AlbumModel>();
          if (isArray(albums)) {
            albums.forEach((val) => {
              this.getPhotosCountByAlblumId(val.id).subscribe(photos => {
                if (isArray(photos)) {
                  let albumModel = new AlbumModel();
                  albumModel.id = val.id;
                  albumModel.userid = user.userid;
                  albumModel.title = val.title;
                  albumModel.photosCount = photos.length;
                  this.albumList.push(albumModel);
                }
              }, (error) => {
                throw error;
              });
            });
            this.selectedUser = user;
          }
        }, (error) => {
          throw error;
        });
      }
    }, (error => {
      throw error;
    }));
  }

  private getPhotosCountByAlblumId(albumId: number): Observable<any> {
    return this.httpService.get(AppSettings.API_ENDPOINT_URL + AppSettings.GET_PHOTO_LIST_SERVICE, albumId);
  }

  private fetchAlbumListByUserId(userId: number): Observable<any> {
    return this.httpService.get(AppSettings.API_ENDPOINT_URL + AppSettings.GET_ALBUM_LIST_SERVICE, userId);
  }

  public doAlbumSelect(event: MatCheckboxChange, selectType: string, selectedAlbum?: AlbumModel) {
    if (selectType === 'all') {
      this.isSelectAllChecked = event.checked;
      this.albumList.map((val) => {
        val.checked = event.checked;
      });
      this.sharedDataService.setSelectedAlbums(selectType, this.albumList, selectedAlbum, event.checked);
    } else {
      this.isSelectAllChecked = false;
      this.sharedDataService.setSelectedAlbums(selectType, this.albumList, selectedAlbum, event.checked);
    }
  }
}
