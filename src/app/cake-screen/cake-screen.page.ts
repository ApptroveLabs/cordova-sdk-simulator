import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { IonicModule } from '@ionic/angular'; // Import IonicModule
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cake-screen',
  templateUrl: './cake-screen.page.html',
  styleUrls: ['./cake-screen.page.scss'],
  standalone:true,
  imports: [CommonModule, IonicModule], // Import necessary modulesa
})


export class CakeScreenPage {
  productId: string | null = null;
  quantity: string | null = null;
  actionData: string | null = null;
  dlv: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Get query parameters from the URL
    this.route.queryParams.subscribe((params) => {
      this.productId = params['productId'];
      this.quantity = params['quantity'];
      this.actionData = params['actionData'];
      this.dlv = params['dlv'];
    });
  }

  // Get Product Image Based on ID
  getProductImage() {
    switch (this.productId) {
      case 'blueberry':
        return 'assets/blueberrycupcake.png';
      case 'chocochip':
        return 'assets/chocochipcupcake.png';
      case 'vanilla':
        return 'assets/vanillaccupake.png';
      default:
        return 'assets/chocochipcupcake.png';
    }
  }

  // Get JSON Data
  getJsonData() {
    return `{"Action": "${this.actionData}", "Dlv": "${this.dlv}", "Quantity": "${this.quantity}", "Product": "${this.productId}"}`;
  }

  // Copy Data to Clipboard
  copyDataToClipboard() {
    const data = this.getJsonData();
    navigator.clipboard.writeText(data).then(() => {
      alert('Data Copied');
    });
  }
}
