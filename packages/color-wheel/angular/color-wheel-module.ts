import { NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';

import { DIRECTIVES } from './color-wheel-directives';

@NgModule({
  declarations: [DIRECTIVES],
  exports: [DIRECTIVES]
})
export class NativeScriptColorWheelModule {}

registerElement('ColorWheel', () => require('@sergeymell/color-wheel').ColorWheel);
