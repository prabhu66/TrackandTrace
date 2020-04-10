import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSitesAssociateComponent } from './admin-sites-associate.component';

describe('AdminSitesAssociateComponent', () => {
  let component: AdminSitesAssociateComponent;
  let fixture: ComponentFixture<AdminSitesAssociateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSitesAssociateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSitesAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
