import { Component, computed} from '@angular/core';

import { NgIf, NgFor, CurrencyPipe, AsyncPipe } from '@angular/common';
import { Product } from '../product';
import { catchError, EMPTY } from 'rxjs';
import { ProductService } from '../product.service';
import { CartService } from 'src/app/cart/cart.service';

@Component({
    selector: 'pm-product-detail',
    templateUrl: './product-detail.component.html',
    standalone: true,
    imports: [NgIf, NgFor, CurrencyPipe, AsyncPipe]
})
export class ProductDetailComponent {
  

  constructor(
    private productService: ProductService,
    private cartService: CartService
  
  ) {}

  product = this.productService.product;
  errorMessage = this.productService.productError;

  // // Product to display
  // product$ = this.productService.product$
  //   .pipe(
  //           catchError(err => {
  //             this.errorMessage = err;
  //             return EMPTY;
  //           })
  //         );

  // Set the page title
  // pageTitle = this.product$ ? `Product Detail for: ${this.product$.productName}` : 'Product Detail';
  pageTitle = computed(() => 
    this.product()
      ? `Product Detail for: ${this.product()?.productName}`
      : `Product Detail`
    )


  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
