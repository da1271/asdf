import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupManagementCoreComponent } from './group-management-core.component';

describe('GroupManagementCoreComponent', () => {
  let component: GroupManagementCoreComponent;
  let fixture: ComponentFixture<GroupManagementCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupManagementCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupManagementCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
