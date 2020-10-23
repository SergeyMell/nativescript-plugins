import { NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { ColorWheel } from '@sergeymell/color-wheel';

import { Directive } from '@angular/core';

@Directive({
  selector: 'ColorWheel'
})
export class ColorWheelDirective {}

@NgModule({
  declarations: [ColorWheelDirective],
  exports: [ColorWheelDirective]
})
export class NativeScriptColorWheelModule {}

registerElement('ColorWheel', () => ColorWheel);
