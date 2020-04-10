import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPeopleStatusComponent } from './dashboard-people-status.component';

describe('DashboardPeopleStatusComponent', () => {
  let component: DashboardPeopleStatusComponent;
  let fixture: ComponentFixture<DashboardPeopleStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPeopleStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPeopleStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
