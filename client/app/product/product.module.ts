import { NgModule }                                 from '@angular/core';
import { CommonModule }        from '@angular/common';

import { AddComponent }            from './add.component'
import { ProductComponent }            from './product.component'
import { RouterModule, Routes }        from '@angular/router';

import { FormsModule,
    ReactiveFormsModule }           from '@angular/forms';
import { HttpModule }               from '@angular/http';
import { ProductService }              from '../_services/product.service'
import { SharedModule }              from '../shared/shared.module'

export const PRODUCT_ROUTES:Routes = [
];

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forChild(PRODUCT_ROUTES)
  ],
  declarations: [
    AddComponent,
    ProductComponent,
  ],
  providers: [
    ProductService,
  ],
})
export class ProductModule { }