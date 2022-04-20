import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDetailEditComponent } from './trip-detail-edit.component';

describe('TripDetailEditComponent', () => {
  let component: TripDetailEditComponent;
  let fixture: ComponentFixture<TripDetailEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripDetailEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
