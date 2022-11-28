import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductHeaderComponent } from './product-header/product-header.component';
import { AsyncPipe, CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { ProductFooterComponent } from './product-footer/product-footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [ProductComponent, ProductCardComponent, ProductHeaderComponent, ProductFooterComponent],
    imports: [
        ProductRoutingModule,
        AsyncPipe,
        NgForOf,
        NgIf,
        MatButtonModule,
        CurrencyPipe,
        MatIconModule,
        MatSlideToggleModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
    ],
    providers: [{ provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' }],
})
export class ProductModule {}
