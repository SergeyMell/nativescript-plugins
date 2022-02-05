import { DemoSharedBase } from '../utils';
import { NativescriptSumsub } from '@sergeymell/nativescript-sumsub';

export class DemoSharedNativescriptSumsub extends DemoSharedBase {
	testIt() {
		const token = '_act-sbx-ac1f2b01-920d-4433-990a-e7b867ddd6b8';
		const sdk = new NativescriptSumsub(token);
		sdk.present();
	}
}
