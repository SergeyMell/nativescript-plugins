import { DemoSharedBase } from '../utils';
import { NativescriptSumsub } from '@sergeymell/nativescript-sumsub';

export class DemoSharedNativescriptSumsub extends DemoSharedBase {
	testIt() {
		const token = '_act-sbx-3ada3697-1217-40e6-8ee1-57e9f277e8ff';
		const sdk = new NativescriptSumsub(token);
		sdk.present();
	}
}
