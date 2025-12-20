import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, ProductFilter } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products$ = new BehaviorSubject<Product[]>([]);

  constructor() {
    this.initializeProducts();
  }

  private initializeProducts(): void {
    // TODO: Cargar productos desde API
    const mockProducts: Product[] = [];
    this.products$.next(mockProducts);
  }

  getProducts(): Observable<Product[]> {
    return this.products$.asObservable();
  }

  getProductById(id: string): Observable<Product | undefined> {
    return new Observable(observer => {
      const product = this.products$.value.find(p => p.id === id);
      observer.next(product);
      observer.complete();
    });
  }

  filterProducts(filter: ProductFilter): Observable<Product[]> {
    // TODO: Implementar lógica de filtrado
    return this.products$.asObservable();
  }

  addProduct(product: Product): Observable<boolean> {
    // TODO: Implementar POST a API
    return new Observable(observer => {
      observer.next(true);
      observer.complete();
    });
  }

  updateProduct(product: Product): Observable<boolean> {
    // TODO: Implementar PUT a API
    return new Observable(observer => {
      observer.next(true);
      observer.complete();
    });
  }
}
