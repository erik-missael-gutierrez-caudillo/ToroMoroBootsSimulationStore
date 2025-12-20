import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart$ = new BehaviorSubject<Cart>({
    items: [],
    totalPrice: 0,
    totalItems: 0
  });

  getCart(): Observable<Cart> {
    return this.cart$.asObservable();
  }

  addToCart(product: Product, quantity: number, size?: string, color?: string): void {
    const currentCart = this.cart$.value;
    const existingItem = currentCart.items.find(
      item => item.product.id === product.id && item.size === size && item.color === color
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentCart.items.push({ product, quantity, size, color });
    }

    this.updateCart();
  }

  removeFromCart(productId: string): void {
    const currentCart = this.cart$.value;
    currentCart.items = currentCart.items.filter(item => item.product.id !== productId);
    this.updateCart();
  }

  updateQuantity(productId: string, quantity: number): void {
    const item = this.cart$.value.items.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.updateCart();
    }
  }

  applyCoupon(couponCode: string): void {
    // TODO: Validar cupón en API
    this.cart$.value.appliedCoupon = couponCode;
    this.updateCart();
  }

  clearCart(): void {
    this.cart$.next({
      items: [],
      totalPrice: 0,
      totalItems: 0
    });
  }

  private updateCart(): void {
    const currentCart = this.cart$.value;
    currentCart.totalItems = currentCart.items.reduce((sum, item) => sum + item.quantity, 0);
    currentCart.totalPrice = currentCart.items.reduce(
      (sum, item) => sum + (item.product.price * item.quantity),
      0
    );
    this.cart$.next(currentCart);
  }
}
