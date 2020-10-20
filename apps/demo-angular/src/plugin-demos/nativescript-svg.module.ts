import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptSvgComponent } from './nativescript-svg.component';
import {NativeScriptSvgModule as SVGModule} from '@sergeymell/nativescript-svg/angular';

@NgModule({
	imports: [
	  NativeScriptCommonModule,
    NativeScriptRouterModule.forChild([{ path: '', component: NativescriptSvgComponent }]),
    SVGModule
  ],
	declarations: [NativescriptSvgComponent],
	schemas: [NO_ERRORS_SCHEMA],
})
export class NativescriptSvgModule {}
