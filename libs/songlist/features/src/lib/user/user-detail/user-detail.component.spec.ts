import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetail } from './user-detail.component';

describe('UserDetailComponent', () => {
  let component: UserDetail;
  let fixture: ComponentFixture<UserDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
