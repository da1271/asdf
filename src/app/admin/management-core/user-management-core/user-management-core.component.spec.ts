import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementCoreComponent } from './user-management-core.component';

describe('UserManagementCoreComponent', () => {
  let component: UserManagementCoreComponent;
  let fixture: ComponentFixture<UserManagementCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManagementCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
