import { NgModule }            				from '@angular/core';
import { RouterModule, Routes }				from '@angular/router';
import { LandingComponent }					  from "./landing/landing.component";
import { PageNotFoundComponent }		  from "./page-not-found/page-not-found.component";
import { ShopComponent }		  from "./shop/shop.component";
import { AddComponent as AddProductComponent }		  from "./product/add.component";
import { ProductComponent }		  from "./product/product.component";
import { AuthGuard }                from './_guards/auth.guard';


const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'shop/:id', component: ShopComponent },
  { path: 'shop/:shop_id/add_product', component: AddProductComponent },
  { path: 'shop/:shop_id/product/:product_id', component: ProductComponent },
  { path: 'profile', loadChildren: 'app/account/account.module#AccountModule' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
