import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompleteEventPage } from './complete-event.page';

describe('CompleteEventPage', () => {
  let component: CompleteEventPage;
  let fixture: ComponentFixture<CompleteEventPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
