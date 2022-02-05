import { NativescriptSumsubCommon } from './common';
import { android } from '@nativescript/core/application';

declare let com: any;

@NativeClass
@Interfaces([com.sumsub.sns.core.data.listener.TokenExpirationHandler])
class TokenUpdater extends java.lang.Object {
	constructor() {
		super();
		// Required by Android runtime when native class is extended through TypeScript.
		return global.__native(this);
	}

	onTokenExpired(...args) {
		console.log('args');
		console.log(args);
		return '';
	}
}

export class NativescriptSumsub extends NativescriptSumsubCommon {
	private sdk;

	constructor(accessToken: string) {
		super();

		this.sdk = new com.sumsub.sns.core.SNSMobileSDK.Builder(android.foregroundActivity).withAccessToken(accessToken, new TokenUpdater()).withLocale(new java.util.Locale('en')).build();
	}

	present() {
		this.sdk.launch();
	}
}
