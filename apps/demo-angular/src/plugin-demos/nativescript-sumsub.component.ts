import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptSumsub } from '@demo/shared';
import {} from '@sergeymell/nativescript-sumsub';

@Component({
	selector: 'demo-nativescript-sumsub',
	templateUrl: 'nativescript-sumsub.component.html',
})
export class NativescriptSumsubComponent {
	demoShared: DemoSharedNativescriptSumsub;

	constructor(private _ngZone: NgZone) {}

	ngOnInit() {
		this.demoShared = new DemoSharedNativescriptSumsub();
	}
}
