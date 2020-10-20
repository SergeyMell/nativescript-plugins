import { NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { NativescriptSvg } from '@sergeymell/nativescript-svg';

@NgModule()
export class NativeScriptNativescriptSvgModule {}

// Uncomment this line if the package provides a custom view component
registerElement('SVGImage', () => NativescriptSvg.SVGImage);
