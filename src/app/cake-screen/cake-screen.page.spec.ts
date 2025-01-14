import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CakeScreenPage } from './cake-screen.page';

describe('CakeScreenPage', () => {
  let component: CakeScreenPage;
  let fixture: ComponentFixture<CakeScreenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CakeScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
