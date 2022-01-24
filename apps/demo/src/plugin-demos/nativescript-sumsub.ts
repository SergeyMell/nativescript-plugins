import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptSumsub } from '@demo/shared';
import {} from '@sergeymell/nativescript-sumsub';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptSumsub {}
