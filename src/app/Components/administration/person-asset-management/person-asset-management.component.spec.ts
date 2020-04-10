import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonAssetManagementComponent } from './person-asset-management.component';

describe('PersonAssetManagementComponent', () => {
  let component: PersonAssetManagementComponent;
  let fixture: ComponentFixture<PersonAssetManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonAssetManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonAssetManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
