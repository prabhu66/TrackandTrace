import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOverviewPeopleComponent } from './dashboard-overview-people.component';

describe('DashboardOverviewPeopleComponent', () => {
  let component: DashboardOverviewPeopleComponent;
  let fixture: ComponentFixture<DashboardOverviewPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOverviewPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOverviewPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
