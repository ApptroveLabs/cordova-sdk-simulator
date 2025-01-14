import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuiltInEventsPage } from './built-in-events.page';

describe('BuiltInEventsPage', () => {
  let component: BuiltInEventsPage;
  let fixture: ComponentFixture<BuiltInEventsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BuiltInEventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
