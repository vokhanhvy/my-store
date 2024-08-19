import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { CartProduct } from '../../models/CartProduct';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Subscribe to the product service to get products
    this.productService.getProduct().subscribe((res) => {
      this.products = res;
    });
  }

  addToCart(product: Product): void {
    // Get the products in the cart from the product service
    const cartProducts: CartProduct[] = this.productService.getCartProduct();
    // Find the index
    const cartIdx = cartProducts.findIndex((cart) => cart.id === product.id);

    if (cartIdx === -1) {
      // if product is not in the cart, set quantity 1
      const newCartProduct: CartProduct = { ...product, quantity: 1 };
      // Update product service
      this.productService.addToCart([...cartProducts, newCartProduct]);
      //inform end users
      alert(`New Item '${product.name}' added to cart`);
    } else {
      //product exist in cart, add 1 to quantity
      cartProducts[cartIdx].quantity += 1;
      // update product service
      this.productService.addToCart([...cartProducts]);
      // inform user
      alert(
        `Item '${product.name}' quantity updated to ${cartProducts[cartIdx].quantity}`
      );
    }
  }
}
