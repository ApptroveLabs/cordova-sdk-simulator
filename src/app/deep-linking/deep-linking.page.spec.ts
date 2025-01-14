import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeepLinkingPage } from './deep-linking.page';

describe('DeepLinkingPage', () => {
  let component: DeepLinkingPage;
  let fixture: ComponentFixture<DeepLinkingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeepLinkingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
