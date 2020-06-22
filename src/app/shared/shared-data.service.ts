import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UserModel } from './model/user-model';
import { AlbumModel } from './model/album-model';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  public selectedUser = new BehaviorSubject<UserModel>(null);
  public selectedAlbums = new BehaviorSubject<Array<AlbumModel>>(null);
  private selectedAlbumsList = new Array<AlbumModel>();

  constructor() { }

  public setSelectedUser(user: UserModel) {
    this.selectedAlbumsList = new Array<AlbumModel>();
    this.selectedUser.next(user);
  }

  public setSelectedAlbums(selectType: string, albumList: Array<AlbumModel>, album: AlbumModel, isSelectAllChecked?: boolean) {
    if (selectType === 'all') {
      this.selectedAlbumsList = new Array<AlbumModel>();
      if (isSelectAllChecked) {
        this.selectedAlbumsList = albumList;
      }
    } else {
      const index = this.selectedAlbumsList.indexOf(album);
      if (index === -1) {
        album.checked = isSelectAllChecked;
        this.selectedAlbumsList.push(album);
      } else {
        this.selectedAlbumsList[index].checked = isSelectAllChecked;
      }
    }
    this.selectedAlbums.next(this.selectedAlbumsList);
  }
}
