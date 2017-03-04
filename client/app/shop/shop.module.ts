import { NgModule }                                 from '@angular/core';
import { CommonModule }        from '@angular/common';

import { ListComponent }            from './list.component'
import { AddComponent }            from './add.component'
import { ShopComponent }            from './shop.component'
import { RouterModule, Routes }        from '@angular/router';

import { FormsModule,
    ReactiveFormsModule }           from '@angular/forms';
import { HttpModule }               from '@angular/http';
import { ShopService }              from '../_services/shop.service'
import { SharedModule }              from '../shared/shared.module'

export const SHOP_ROUTES:Routes = [
  { path: 'list', component: ListComponent },
  { path: 'add', component: AddComponent },
];

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forChild(SHOP_ROUTES)
  ],
  declarations: [
    ListComponent,
    AddComponent,
    ShopComponent,
  ],
  providers: [
    ShopService,
  ],
})
export class ShopModule { }