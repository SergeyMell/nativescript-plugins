import { Component, NgZone } from '@angular/core';
import { DemoSharedColorWheel } from '@demo/shared';
import {} from '@sergeymell/color-wheel';
import { Color } from '@nativescript/core';

@Component({
	selector: 'demo-color-wheel',
	templateUrl: 'color-wheel.component.html',
})
export class ColorWheelComponent {
	demoShared: DemoSharedColorWheel;
	color: Color = new Color('#0000FF');

	constructor(private _ngZone: NgZone) {}

	ngOnInit() {
		this.demoShared = new DemoSharedColorWheel();
	}

  onColorSelected(args) {
    this.color = args.object;
  }
}
