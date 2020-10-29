import * as common from './common';
import { ColorWheel as ColorWheelDefinition } from '.';
import { Color } from '@nativescript/core';
import { releaseNativeObject } from '@nativescript/core/utils';
global.moduleMerge(common, exports);

/**
 * Tap handler implementation
 * [Documentation]{@link https://stackoverflow.com/questions/12770181/how-to-get-the-pixel-color-on-touch}
 */
@NativeClass
class TapHandler extends NSObject {
	public tap(args) {
		/** Define tap position */
		const position = args.locationInView(args.view);
		const x = position.x;
		const y = position.y;

		/** Draw 1 pixel canvas in place */
		let pixel = malloc(4 * interop.sizeof(interop.types.uint8));
		let colorSpace = CGColorSpaceCreateDeviceRGB();
		let context = CGBitmapContextCreate(pixel, 1, 1, 8, 4, colorSpace, CGImageAlphaInfo.kCGImageAlphaPremultipliedFirst);

		CGContextTranslateCTM(context, -x, -y);
		args.view.layer.renderInContext(context);

		/** Emit selected color */
		const reference = new interop.Reference(interop.types.uint8, pixel);
		const owner = (<any>args.view).owner;

		if (reference.value && owner) {
			owner.notify({
				eventName: 'colorSelect',
				object: Object.assign({}, owner, {
					isFirstChange: false,
					color: new Color(reference[0], reference[1], reference[2], reference[3]),
					colorPosition: { x, y },
				}),
			});
		}

		/** Release allocated memory */
		// TODO: For some reason such memory release crashes the app. Let's believe in JS Garbage collector until I find correct solution
		// releaseNativeObject(colorSpace);
		// releaseNativeObject(context);
		free(pixel);
	}

	public static ObjCExposedMethods = {
		tap: { returns: interop.types.void, params: [interop.types.id, interop.types.id] },
	};
}

const handler = new TapHandler();

export class ColorWheel extends common.ColorWheelCommon implements ColorWheelDefinition {
	nativeView: UIImageView;

	/** Creates new image view. */
	public createNativeView(): Object {
		const imageView = UIImageView.new();

		const tap = new UITapGestureRecognizer({
			target: handler,
			action: 'tap',
		});

		imageView.addGestureRecognizer(tap);
		imageView.userInteractionEnabled = true;

		/**
		 * Generating color wheel by means of **CIFilter**
		 * [Post with details]{@link https://noahgilmore.com/blog/cifilter-colorwheel}
		 */
		const colorSpace = CGColorSpaceCreateDeviceRGB();
		const filter = CIFilter.filterWithNameWithInputParameters('CIHueSaturationValueGradient', {
			//@ts-ignore
			inputColorSpace: colorSpace,
			inputDither: 0,
			inputRadius: this.radius,
			inputSoftness: 0,
			inputValue: 1,
		});
		const image = UIImage.imageWithCIImage(filter.outputImage);
		imageView.image = image;

		// TODO: For some reason such memory release crashes the app. Let's believe in JS Garbage collector until I find correct solution
		// releaseNativeObject(colorSpace);

		return imageView;
	}

	/**
	 * Initializes properties/listeners of the native view.
	 */
	initNativeView(): void {
		/**
		 * Attach the owner to nativeView.
		 * When nativeView is tapped we get the owning JS object through this field.
		 */
		(<any>this.nativeView).owner = this;
		super.initNativeView();
	}

	/**
	 * Clean up references to the native view and resets nativeView to its original state.
	 * If you have changed nativeView in some other way except through setNative callbacks
	 * you have a chance here to revert it back to its original state
	 * so that it could be reused later.
	 */
	disposeNativeView(): void {
		// Remove reference from native listener to this instance.
		(<any>this.nativeView).owner = null;

		// If you want to recycle nativeView and have modified the nativeView
		// without using Property or CssProperty (e.g. outside our property system - 'setNative' callbacks)
		// you have to reset it to its initial state here.
		super.disposeNativeView();
	}

	/**
	 * TODO: This is an algorithm of full range. It's definitely not optimal
	 *       should think about something better
	 * Determination of point coordinates by color is done according to
	 * {@link https://stackoverflow.com/questions/18170398/how-to-get-location-of-a-specified-color-in-an-uiimage}
	 * {@link https://github.com/erica/iOS-6-Advanced-Cookbook/blob/master/C06%20-%20Images/04%20-%20Rotation%20Accelerate/UIImage-Utils.m}
	 */
	[common.colorProperty.setNative](value: string | Color) {
		const color = value instanceof Color ? value : new Color(value);

		const width = this.nativeView.image.size.width;
		const height = this.nativeView.image.size.height;

		let colorSpace = CGColorSpaceCreateDeviceRGB();
		let bitmapData = malloc(4 * width * height);
		let context = CGBitmapContextCreate(bitmapData, width, height, 8, width * 4, colorSpace, CGImageAlphaInfo.kCGImageAlphaPremultipliedFirst);

		const rect = CGRectMake(50, 50, width, height);
		const cgImage = CIContext.new().createCGImageFromRect(this.nativeView.image.CIImage, rect);

		CGContextDrawImage(context, rect, cgImage);

		const reference = new interop.Reference(interop.types.uint8, bitmapData);

		let resX = -1;
		let resY = -1;
		let metrics = Infinity;
		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				const red = reference[redOffset(x, y, width)];
				const green = reference[greenOffset(x, y, width)];
				const blue = reference[blueOffset(x, y, width)];
				const distance = Math.abs(red - color.r) + Math.abs(green - color.g) + Math.abs(blue - color.b);
				if (distance < metrics) {
					metrics = distance;
					resX = x;
					resY = y;
				}
			}
		}
		/** Release allocated memory */
		// TODO: For some reason such memory release crashes the app. Let's believe in JS Garbage collector until I find correct solution
		// releaseNativeObject(colorSpace);
		// releaseNativeObject(context);
		free(bitmapData);

		if (resX > -1 && resY > -1) {
			this.notify({
				eventName: 'colorSelect',
				object: Object.assign({}, this, {
					isFirstChange: true,
					color,
					colorPosition: { x: resX, y: resY },
				}),
			});
		}
	}
}

export function redOffset(x, y, w) {
	return y * w * 4 + x * 4 + 1;
}

export function greenOffset(x, y, w) {
	return y * w * 4 + x * 4 + 2;
}

export function blueOffset(x, y, w) {
	return y * w * 4 + x * 4 + 3;
}
