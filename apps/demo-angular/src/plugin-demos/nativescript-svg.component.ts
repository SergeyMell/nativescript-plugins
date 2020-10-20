import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptSvg } from '@demo/shared';

@Component({
	selector: 'demo-nativescript-svg',
	templateUrl: 'nativescript-svg.component.html',
})
export class NativescriptSvgComponent {
	demoShared: DemoSharedNativescriptSvg;

	constructor(private _ngZone: NgZone) {}

	ngOnInit() {
		this.demoShared = new DemoSharedNativescriptSvg();
	}
}
