import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class EcommerceService {
  private products: Product[] = [
    { id: 1, name: "Smartphone", description: "Latest smartphone with 128GB storage", price: 699.99, category: "Electronics", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/smartphone.jpg" },
    { id: 2, name: "Laptop", description: "High-performance laptop with 16GB RAM", price: 1299.99, category: "Electronics", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/laptop.jpg" },
    { id: 3, name: "Headphones", description: "Noise-cancelling wireless headphones", price: 199.99, category: "Electronics", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/headphones.jpg" },
    { id: 4, name: "T-Shirt", description: "Comfortable cotton t-shirt", price: 19.99, category: "Clothing", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/t-shirt.jpg" },
    { id: 5, name: "Jeans", description: "Slim-fit denim jeans", price: 49.99, category: "Clothing", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/jeans.jpg" },
    { id: 6, name: "Sneakers", description: "Stylish and durable sneakers", price: 79.99, category: "Clothing", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/sneakers.jpg" },
    { id: 7, name: "Novel", description: "Bestselling fiction novel", price: 14.99, category: "Books", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/novel.jpg" },
    { id: 8, name: "Cookbook", description: "Collection of delicious recipes", price: 24.99, category: "Books", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/cookbook.jpg" },
    { id: 9, name: "Sofa", description: "Comfortable 3-seater sofa", price: 499.99, category: "Home", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/sofa.jpg" },
    { id: 10, name: "Table Lamp", description: "Modern LED table lamp", price: 39.99, category: "Home", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/table_lamp.jpg" },
    { id: 11, name: "Smartwatch", description: "Fitness tracking and notifications", price: 199.99, category: "Electronics", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/smartphone.jpg" },
    { id: 12, name: "Bluetooth Speaker", description: "Portable speaker with great sound", price: 59.99, category: "Electronics", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/bluetooth_speaker.jpg" },
    { id: 13, name: "Gaming Mouse", description: "High-precision gaming mouse", price: 49.99, category: "Electronics", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/gaming_mouse.jpg" },
    { id: 14, name: "Backpack", description: "Durable and spacious backpack", price: 39.99, category: "Accessories", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/backpack.jpg" },
    { id: 15, name: "Sunglasses", description: "UV-protected stylish sunglasses", price: 29.99, category: "Clothing", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/sunglasses.jpg" },
    { id: 16, name: "Desk Chair", description: "Ergonomic office chair", price: 149.99, category: "Home", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/desk_chair.jpg" },
    { id: 17, name: "Coffee Maker", description: "Automatic drip coffee maker", price: 89.99, category: "Home", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/coffee_maker.jpg" },
    { id: 18, name: "Blender", description: "High-speed kitchen blender", price: 79.99, category: "Home", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/blender.jpg" },
    { id: 19, name: "Running Shoes", description: "Lightweight running shoes", price: 89.99, category: "Clothing", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/running_shoes.jpg" },
    { id: 20, name: "Winter Jacket", description: "Warm and waterproof jacket", price: 129.99, category: "Clothing", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/winter_jacket.jpg" },
    { id: 21, name: "Yoga Mat", description: "Non-slip yoga mat", price: 29.99, category: "Fitness", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/yoga_mat.jpg" },
    { id: 22, name: "Dumbbell Set", description: "Adjustable dumbbell set", price: 99.99, category: "Fitness", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/dumbbell_set.jpg" },
    { id: 23, name: "Wireless Earbuds", description: "True wireless earbuds", price: 129.99, category: "Electronics", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/wireless_earbuds.jpg" },
    { id: 24, name: "External Hard Drive", description: "1TB portable hard drive", price: 69.99, category: "Electronics", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/external_hard_drive.jpg" },
    { id: 25, name: "Printer", description: "All-in-one wireless printer", price: 149.99, category: "Electronics", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/printer.jpg" },
    { id: 26, name: "Electric Toothbrush", description: "Rechargeable electric toothbrush", price: 49.99, category: "Health", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/electric_toothbrush.jpg" },
    { id: 27, name: "Air Purifier", description: "HEPA air purifier", price: 199.99, category: "Home", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/air_purifier.jpg" },
    { id: 28, name: "Vacuum Cleaner", description: "Bagless vacuum cleaner", price: 129.99, category: "Home", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/vacuum_cleaner.jpg" },
    { id: 30, name: "Toaster", description: "2-slice stainless steel toaster", price: 39.99, category: "Home", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/toaster.jpg" },
    { id: 31, name: "Plant Pot", description: "Ceramic plant pot", price: 24.99, category: "Home", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/plant_pot.jpg" },
    { id: 32, name: "Throw Blanket", description: "Soft and cozy throw blanket", price: 34.99, category: "Home", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/throw_blanket.jpg" },
    { id: 33, name: "Wall Art", description: "Framed wall art", price: 59.99, category: "Home", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/wall_art.jpg" },
    { id: 34, name: "Water Bottle", description: "Insulated stainless steel bottle", price: 29.99, category: "Accessories", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/water_bottle.jpg" },
    { id: 35, name: "Luggage", description: "Hard-shell suitcase", price: 199.99, category: "Accessories", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/luggage.jpg" },
    { id: 36, name: "Sports Cap", description: "Breathable sports cap", price: 19.99, category: "Accessories", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/sports_cap.jpg" },
    { id: 37, name: "Action Camera", description: "Waterproof 4K action camera", price: 299.99, category: "Electronics", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/action_camera.jpg" },
    { id: 38, name: "Tripod", description: "Lightweight camera tripod", price: 49.99, category: "Photography", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/tripod.jpg" },
    { id: 39, name: "VR Headset", description: "Immersive virtual reality headset", price: 499.99, category: "Electronics", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/vr_headset.jpg" },
    { id: 40, name: "Electric Kettle", description: "1.5L electric kettle", price: 39.99, category: "Home", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/electric_kettle.jpg" },
    { id: 41, name: "Board Game", description: "Family-friendly strategy game", price: 29.99, category: "Toys", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/board_game.jpg" },
    { id: 42, name: "Fitness Tracker", description: "Track steps and heart rate", price: 99.99, category: "Fitness", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/fitness_tracker.jpg" },
    { id: 43, name: "E-Reader", description: "Compact and lightweight e-reader", price: 129.99, category: "Electronics", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/e-reader.jpg" },
    { id: 44, name: "Ski Jacket", description: "Waterproof and insulated ski jacket", price: 149.99, category: "Clothing", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/ski_jacket.jpg" },
    { id: 45, name: "Bean Bag Chair", description: "Large and comfortable bean bag", price: 89.99, category: "Home", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/bean_bag_chair.jpg" },
    { id: 46, name: "Cookware Set", description: "Non-stick pots and pans set", price: 129.99, category: "Home", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/cookware_set.jpg" },
    { id: 47, name: "Gaming Chair", description: "Adjustable gaming chair", price: 199.99, category: "Home", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/gaming_chair.jpg" },
    { id: 48, name: "Dog Bed", description: "Comfortable bed for pets", price: 49.99, category: "Pets", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/dog_bed.jpg" },
    { id: 49, name: "Cat Tree", description: "Multi-level cat tree", price: 79.99, category: "Pets", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/cat_tree.jpg" },
    { id: 50, name: "Digital Piano", description: "88-key digital piano", price: 599.99, category: "Music", imageUrl: "https://storage.googleapis.com/static.trackier.io/images/test-data/downloaded_images/digital_piano.jpg" }
  ];

  private cart = new BehaviorSubject<Product[]>([]);
  cart$ = this.cart.asObservable();

  private wishlist = new BehaviorSubject<Product[]>([]);
  wishlist$ = this.wishlist.asObservable();

  private onboardingSeen = new BehaviorSubject<boolean>(localStorage.getItem('onboardingSeen') === 'true');
  onboardingSeen$ = this.onboardingSeen.asObservable();

  private userEmail = new BehaviorSubject<string | null>(localStorage.getItem('userEmail'));
  userEmail$ = this.userEmail.asObservable();

  constructor() { }

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  addToCart(product: Product) {
    const currentCart = this.cart.value;
    this.cart.next([...currentCart, product]);
  }

  removeFromCart(productId: number) {
    const currentCart = this.cart.value;
    const index = currentCart.findIndex(p => p.id === productId);
    if (index !== -1) {
      const newCart = [...currentCart];
      newCart.splice(index, 1);
      this.cart.next(newCart);
    }
  }

  toggleWishlist(product: Product) {
    const currentWishlist = this.wishlist.value;
    const index = currentWishlist.findIndex(p => p.id === product.id);
    if (index === -1) {
      this.wishlist.next([...currentWishlist, product]);
      return true; // Added
    } else {
      const newWishlist = [...currentWishlist];
      newWishlist.splice(index, 1);
      this.wishlist.next(newWishlist);
      return false; // Removed
    }
  }

  isInWishlist(productId: number): boolean {
    return this.wishlist.value.some(p => p.id === productId);
  }

  setOnboardingSeen(seen: boolean) {
    localStorage.setItem('onboardingSeen', seen.toString());
    this.onboardingSeen.next(seen);
  }

  setUserEmail(email: string | null) {
    if (email) localStorage.setItem('userEmail', email);
    else localStorage.removeItem('userEmail');
    this.userEmail.next(email);
  }

  hasOnboardingBeenSeen(): boolean {
    return this.onboardingSeen.value;
  }

  hasActiveUserSession(): boolean {
    return !!this.userEmail.value;
  }

  getCurrentUserEmail(): string | null {
    return this.userEmail.value;
  }

  clearCart() {
    this.cart.next([]);
  }

  getTotalPrice(): number {
    return this.cart.value.reduce((total, p) => total + p.price, 0);
  }

  getCartCount(): number {
    return this.cart.value.length;
  }
}
