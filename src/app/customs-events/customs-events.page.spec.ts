import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomsEventsPage } from './customs-events.page';

describe('CustomsEventsPage', () => {
  let component: CustomsEventsPage;
  let fixture: ComponentFixture<CustomsEventsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomsEventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
