import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { ColorPickerModalComponent, ColorWheelComponent } from './color-wheel.component';
import { NativeScriptColorWheelModule } from '@sergeymell/color-wheel/angular';

@NgModule({
  imports: [
    NativeScriptColorWheelModule,
    NativeScriptCommonModule,
    NativeScriptRouterModule.forChild([{ path: '', component: ColorWheelComponent }])],
  declarations: [
    ColorWheelComponent,
    ColorPickerModalComponent,
  ],
  entryComponents: [
    ColorPickerModalComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ColorWheelModule {
}
