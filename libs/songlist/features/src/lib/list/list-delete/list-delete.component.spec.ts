import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListDeleteComponent } from './list-delete.component';

describe('ListDeleteComponent', () => {
  let component: ListDeleteComponent;
  let fixture: ComponentFixture<ListDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListDeleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
