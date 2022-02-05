import { NativescriptSumsubCommon } from './common';

declare var SNSMobileSDK: any;

export class NativescriptSumsub extends NativescriptSumsubCommon {
	private sdk;

	constructor(accessToken: string) {
		super();
		// TODO: Need to find a way to setup like a constructor, not with a static method
		this.sdk = SNSMobileSDK.setupWithAccessToken(accessToken);
		console.log(this.sdk.verboseStatus);
		this.sdk.tokenExpirationHandler((f) => {
			console.log('f', f);
		});
		this.sdk.onEvent((sdk, event) => {
			console.log('event');
			console.log(event);
		});
	}

	get isReady(): string {
		return this.sdk.isReady;
	}

	get verboseStatus(): string {
		return this.sdk.verboseStatus;
	}

	present() {
		return this.sdk.present();
	}

	dismiss() {
		return this.sdk.dismiss();
	}
}
