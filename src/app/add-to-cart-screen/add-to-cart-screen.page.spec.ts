import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddToCartScreenPage } from './add-to-cart-screen.page';

describe('AddToCartScreenPage', () => {
  let component: AddToCartScreenPage;
  let fixture: ComponentFixture<AddToCartScreenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToCartScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
