import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicLinkPage } from './dynamic-link.page';

describe('DynamicLinkPage', () => {
  let component: DynamicLinkPage;
  let fixture: ComponentFixture<DynamicLinkPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicLinkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
