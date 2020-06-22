import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoTileListComponent } from './photo-tile-list.component';

describe('PhotoTileListComponent', () => {
  let component: PhotoTileListComponent;
  let fixture: ComponentFixture<PhotoTileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoTileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoTileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
