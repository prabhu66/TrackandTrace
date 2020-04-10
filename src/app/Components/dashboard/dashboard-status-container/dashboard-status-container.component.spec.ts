import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStatusContainerComponent } from './dashboard-status-container.component';

describe('DashboardStatusContainerComponent', () => {
  let component: DashboardStatusContainerComponent;
  let fixture: ComponentFixture<DashboardStatusContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardStatusContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardStatusContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
