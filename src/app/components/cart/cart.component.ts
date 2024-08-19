import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product';
import { CartProduct } from '../../models/CartProduct';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: Product[] = [];
  productsInCart: CartProduct[] = [];
  totalPrice: number = 0;

  constructor(private productService: ProductService, private route: Router) {}
  //initializes the component
  ngOnInit(): void {
    // get products in the cart from the ProductService
    this.productsInCart = this.productService.getCartProduct();
    this.calculateTotalPrice();
  }

  updateQuantity(id: number, event: Event): void {
    //get the input value
    const input = event.target as HTMLInputElement;
    // check the quantity is at least 1 and convert it to a string
    const quantity = Math.max(1, Number(input.value)).toString();
    // Find the index
    const cartIdx = this.productsInCart.findIndex((cart) => cart.id === id);
    if (cartIdx !== -1) {
      this.productsInCart[cartIdx].quantity = Number(quantity); // Update quantity
      this.productService.addToCart(this.productsInCart); // Update cart in service
      this.calculateTotalPrice();
    }
  }

  removeCart(id: number): void {
    // Find the index
    const cartIdx = this.productsInCart.findIndex((cart) => cart.id === id);
    if (cartIdx !== -1) {
      // Remove the product
      const removedProduct = this.productsInCart[cartIdx];
      this.productsInCart.splice(cartIdx, 1);
      // Update the cart in ProductService
      this.productService.addToCart(this.productsInCart);
      /// Recalculate the total price
      this.calculateTotalPrice();
      //// Show an alert to user
      alert(`Item '${removedProduct.name}' has been removed from the cart.`);
    }
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.productsInCart.reduce(
      (acc: number, val: CartProduct) => {
        return acc + val.price * val.quantity;
      },
      0
    );
    // Round to 2 decimal places
    this.totalPrice = Number(this.totalPrice.toFixed(2));
  }
  //checkout success event
  checkoutSuccess(firstName: string): void {
    this.productService.clearCart(); // Clear the cart
    this.route.navigateByUrl(`order-confirmation`);
  }
}
