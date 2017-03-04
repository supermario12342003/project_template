import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { HighlightDirective }  from '../_directives/highlight.directive';
import { FormsModule }         from '@angular/forms';
import { GoogleplaceDirective }      from '../_directives/googleplace.directive'
import { GooglemapDirective }      from '../_directives/googlemap.directive'

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ HighlightDirective, GoogleplaceDirective, GooglemapDirective ],
  exports:      [ HighlightDirective, GoogleplaceDirective, GooglemapDirective,
                  CommonModule, FormsModule ]
})
export class SharedModule { }