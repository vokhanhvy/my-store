import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Product } from '../models/Product';
import { CartProduct } from '../models/CartProduct';
// Makes the service available through the application
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  myStorage = window.sessionStorage;

  constructor(private http: HttpClient) {}
  // Fetch the list of products from json
  //HTTP GET request
  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/data.json');
  }
  // Converts the array to JSON and add to session storagr
  addToCart(product: CartProduct[]): void {
    this.myStorage.setItem('cart', JSON.stringify(product));
  }
  //get the cart from session storage
  getCartProduct(): CartProduct[] | [] {
    const getProduct = this.myStorage.getItem('cart');
    return getProduct ? JSON.parse(getProduct) : [];
  }
  //clear all cart in session storage
  clearCart(): void {
    this.myStorage.clear();
  }
}
