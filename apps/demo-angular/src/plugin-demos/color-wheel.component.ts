import { Component, NgZone } from '@angular/core';
import { DemoSharedColorWheel } from '@demo/shared';
import {} from '@sergeymell/color-wheel';

@Component({
	selector: 'demo-color-wheel',
	templateUrl: 'color-wheel.component.html',
})
export class ColorWheelComponent {
	demoShared: DemoSharedColorWheel;

	constructor(private _ngZone: NgZone) {}

	ngOnInit() {
		this.demoShared = new DemoSharedColorWheel();
	}
}
