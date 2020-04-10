import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFacilityComponent } from './admin-facility.component';

describe('AdminFacilityComponent', () => {
  let component: AdminFacilityComponent;
  let fixture: ComponentFixture<AdminFacilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFacilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
