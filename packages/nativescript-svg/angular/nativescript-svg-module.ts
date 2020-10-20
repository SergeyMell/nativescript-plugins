import { NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';

import { DIRECTIVES } from './nativescript-svg-directives';

@NgModule({
  declarations: [DIRECTIVES],
  exports: [DIRECTIVES]
})
export class NativeScriptSvgModule {}

registerElement('SVGImage', () => require('@sergeymell/nativescript-svg').SVGImage);
