import { NativescriptSumsubCommon } from './common';

declare var SNSMobileSDK: any;

export class NativescriptSumsub extends NativescriptSumsubCommon {
	private sdkInstance;

	constructor(accessToken: string) {
		super();
		// TODO: Need to find a way to setup like a constructor, not with a static method
		this.sdkInstance = SNSMobileSDK.setupWithAccessToken(accessToken);
		console.log(this.sdkInstance.verboseStatus);
		this.sdkInstance.tokenExpirationHandler((f) => {
			console.log('f', f);
		});
		this.sdkInstance.onEvent((sdk, event) => {
			console.log('event');
			console.log(event);
		});
	}

	get isReady(): string {
		return this.sdkInstance.isReady;
	}

	get verboseStatus(): string {
		return this.sdkInstance.verboseStatus;
	}

	present() {
		return this.sdkInstance.present();
	}

	dismiss() {
		return this.sdkInstance.dismiss();
	}
}
