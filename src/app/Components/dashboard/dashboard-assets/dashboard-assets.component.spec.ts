import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAssetsComponent } from './dashboard-assets.component';

describe('DashboardAssetsComponent', () => {
  let component: DashboardAssetsComponent;
  let fixture: ComponentFixture<DashboardAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
