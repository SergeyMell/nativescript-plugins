import { EventData, Page } from '@nativescript/core';
import { DemoSharedColorWheel } from '@demo/shared';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedColorWheel {

  color = '#FF0000';

  colorSelected(event) {
    this.color = event.object;
    this.notifyPropertyChange('color', event.object);
  }

}
