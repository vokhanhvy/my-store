import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product';
import { CartProduct } from '../../models/CartProduct';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit {
  id: number | null = null;
  products: Product[] = [];
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Subscribe to the route parameters to get the id from url
    this.route.paramMap.subscribe((params) => {
      //get id and convert it to a number
      this.id = Number(params.get('id'));
    });
    //fetch the product from service
    this.productService.getProduct().subscribe((res) => {
      // Store the products list in the component
      this.products = res;
      // Find and store by id
      this.product = this.getProductById(this.id);
    });
  }
  getProductById(id: number | null): Product {
    // Filter the products to the matching id
    return this.products.filter((product) => product.id === id)[0];
  }

  addToCart(product: Product): void {
    // get the list products in the cart
    const cartProducts: CartProduct[] = this.productService.getCartProduct();
    // Find the index
    const cartIdx = cartProducts.findIndex((cart) => cart.id === product.id);

    if (cartIdx === -1) {
      // If product is not in the cart, add it with quantity 1
      const newCartProduct: CartProduct = { ...product, quantity: 1 };
      //update the cart in the product service
      this.productService.addToCart([...cartProducts, newCartProduct]);
      // inform to end user
      alert(`New Item '${product.name}' added to cart`);
    } else {
      // If product is already in the cart, increment the quantity by 1
      cartProducts[cartIdx].quantity += 1;
      this.productService.addToCart([...cartProducts]);
      alert(
        `Item '${product.name}' quantity updated to ${cartProducts[cartIdx].quantity}`
      );
    }
  }
}
