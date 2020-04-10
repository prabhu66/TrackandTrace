import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeofenceEditComponent } from './geofence-edit.component';

describe('GeofenceEditComponent', () => {
  let component: GeofenceEditComponent;
  let fixture: ComponentFixture<GeofenceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeofenceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeofenceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
