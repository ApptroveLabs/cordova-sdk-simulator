import { Component, OnInit } from '@angular/core';
import { EcommerceService, Product } from '../services/ecommerce.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {
  wishlist: Product[] = [];

  constructor(
    private ecommerceService: EcommerceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.ecommerceService.wishlist$.subscribe(items => {
      this.wishlist = items;
    });
  }

  viewProduct(product: Product) {
    this.router.navigate(['/product-detail', product.id]);
  }

  removeFromWishlist(product: Product, event: Event) {
    event.stopPropagation();
    this.ecommerceService.toggleWishlist(product);
  }
}
