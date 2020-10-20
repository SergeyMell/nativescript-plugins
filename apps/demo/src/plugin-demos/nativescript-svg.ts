import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptSvg } from '@demo/shared';
import {} from '@sergeymell/nativescript-svg';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptSvg {}
