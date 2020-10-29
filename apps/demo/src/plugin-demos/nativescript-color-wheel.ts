import { EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptColorWheel } from '@demo/shared';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptColorWheel {
	colorWheel = {
		size: 200,
	};

	picker = {
		size: 30,
		borderWidth: 2,
	};

	color = '#0000FF';
	x = 100 - 15;
	y = 100 - 15;

	colorSelected(event) {
		this.notifyPropertyChange('color', event.object.color);
		this.notifyPropertyChange('x', this.normalizedCoordinate(event.object.colorPosition.x));
		this.notifyPropertyChange('y', this.normalizedCoordinate(event.object.colorPosition.y));
	}

	private normalizedCoordinate(coord: number): number {
		coord -= 15;
		if (coord < 0) {
			return 0;
		} else if (coord > this.colorWheel.size - this.picker.size) {
			return this.colorWheel.size - this.picker.size;
		}
		return coord;
	}
}
