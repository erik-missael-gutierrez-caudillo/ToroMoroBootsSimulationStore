import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CurrencyMxnPipe } from './pipes/currency-mxn.pipe';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
    CurrencyMxnPipe
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
    CurrencyMxnPipe
  ]
})
export class SharedModule { }
