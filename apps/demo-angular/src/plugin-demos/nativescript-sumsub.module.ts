import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptSumsubComponent } from './nativescript-sumsub.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptSumsubComponent }])],
	declarations: [NativescriptSumsubComponent],
	schemas: [NO_ERRORS_SCHEMA],
})
export class NativescriptSumsubModule {}
