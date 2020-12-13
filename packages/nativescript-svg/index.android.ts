/// <reference path="../../node_modules/@nativescript/types-android/lib/android-29.d.ts" />

import * as svg from '.';
import * as common from './common';
import * as types from '@nativescript/core/utils/types';
import * as utilsModule from '@nativescript/core/utils';
import * as fileSystemModule from '@nativescript/core/file-system';
import * as httpModule from '@nativescript/core/http';

export * from './common';

let http: typeof httpModule;
function ensureHttp() {
	if (!http) {
		http = require('http');
	}
}

let utils: typeof utilsModule;
function ensureUtils() {
	if (!utils) {
		utils = require('utils/utils');
	}
}

let fs: typeof fileSystemModule;
function ensureFS() {
	if (!fs) {
		fs = require('file-system');
	}
}

declare let com: any;

export class ImageSourceSVG implements svg.ImageSourceSVG {
	private nativeView: any;

	public loadFromResource(name: string): boolean {
		this.nativeView = null;

		ensureUtils();

		const res = utils.ad.getApplicationContext().getResources();
		if (res) {
			const identifier: number = res.getIdentifier(name, 'drawable', utils.ad.getApplication().getPackageName());
			if (0 < identifier) {
				// Load SVG
				this.nativeView = com.caverock.androidsvg.SVG.getFromResource(res, identifier);
			}
		}

		return this.nativeView != null;
	}

	public fromResource(name: string): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			resolve(this.loadFromResource(name));
		});
	}

	public loadFromFile(path: string): boolean {
		ensureFS();

		let fileName = types.isString(path) ? path.trim() : '';
		if (fileName.indexOf('~/') === 0) {
			fileName = fs.path.join(fs.knownFolders.currentApp().path, fileName.replace('~/', ''));
		}

		this.nativeView = com.caverock.androidsvg.SVG.getFromInputStream(new java.io.FileInputStream(new java.io.File(fileName)));
		return this.nativeView != null;
	}

	public fromFile(path: string): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			resolve(this.loadFromFile(path));
		});
	}

	public loadFromData(data: any): boolean {
		this.nativeView = com.caverock.androidsvg.SVG.getFromString(data);
		return this.nativeView != null;
	}

	public fromData(data: any): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			resolve(this.loadFromData(data));
		});
	}

	public loadFromBase64(source: string): boolean {
		const bytes = android.util.Base64.decode(source, android.util.Base64.DEFAULT);
		this.nativeView = com.caverock.androidsvg.SVG.getFromString(new java.lang.String(bytes));
		return this.nativeView != null;
	}

	public fromBase64(data: any): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			resolve(this.loadFromBase64(data));
		});
	}

	public fromUrl(url: string): Promise<boolean> {
		ensureHttp();
		const result = http.getString(url);
		return new Promise<boolean>((resolve, reject) => {
			result
				.then((val) => {
					this.setNativeSource(com.caverock.androidsvg.SVG.getFromString(val));
					resolve(true);
				})
				.catch((e) => {
					reject(false);
				});
		});
	}

	public setNativeSource(source: any): boolean {
		this.nativeView = source;
		return source != null;
	}

	public saveToFile(path: string): boolean {
		// TODO to be implemented
		return false;
	}

	public toBase64String(format: string): string {
		if (!this.nativeView) {
			return null;
		}

		return android.util.Base64.encodeToString(
			format as any, // look into this and why it was setup as string arg
			android.util.Base64.DEFAULT
		);
	}

	get height(): number {
		if (this.nativeView) {
			return this.nativeView.getPitcture().getHeight();
		}

		return NaN;
	}

	get width(): number {
		if (this.nativeView) {
			return this.nativeView.getPitcture().getWidth();
		}

		return NaN;
	}
}

export class SVGImage extends common.SVGImage {
	constructor() {
		super();
	}

	public createNativeView() {
		return new com.caverock.androidsvg.SVGImageView(this._context);
	}

	public _setNativeImage(nativeImage: any) {
		this.nativeView.setSVG(nativeImage.nativeView);
	}

	[common.imageSourceProperty.setNative](value: any) {
		const image = <SVGImage>value;

		if (!image || !image.nativeView) {
			return;
		}

		this._setNativeImage(image);
	}
}
