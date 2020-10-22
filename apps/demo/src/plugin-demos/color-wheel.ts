import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedColorWheel } from '@demo/shared';
import {} from '@sergeymell/color-wheel';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedColorWheel {

  color = 'green';

  colorSelected(event) {
    console.log(event);
    this.color = event.object;
    this.notifyPropertyChange('color', event.object);
  }

}
