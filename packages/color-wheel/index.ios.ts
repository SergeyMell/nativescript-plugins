import { ColorWheelCommon } from '@sergeymell/color-wheel/common';
import { ColorWheel as ColorWheelDefinition } from '@sergeymell/color-wheel/index';
import { Color } from '@nativescript/core';

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
    let context =
      CGBitmapContextCreate(pixel, 1, 1, 8, 4,
        colorSpace, CGImageAlphaInfo.kCGImageAlphaPremultipliedFirst);

    CGContextTranslateCTM(context, -x, -y);
    args.view.layer.renderInContext(context);

    /** Emit selected color */
    const owner = (<any>args.view).owner;
    if (owner) {
      const reference = new interop.Reference(interop.types.uint8, pixel);
      owner.notify({
        eventName: 'colorSelect',
        object: new Color(reference[0], reference[1], reference[2], reference[3])
      });
    }

    /** Release allocated memory */
    CGColorSpaceRelease(colorSpace);
    CGContextRelease(context);
    free(pixel);
  }

  public static ObjCExposedMethods = {
    'tap': { returns: interop.types.void, params: [interop.types.id, interop.types.id] }
  };
}

const handler = new TapHandler();

export class ColorWheel extends ColorWheelCommon implements ColorWheelDefinition {

  nativeView: UIImageView;

  /** Creates new image view. */
  public createNativeView(): Object {
    const imageView = UIImageView.new();

    const tap = new UITapGestureRecognizer({
      target: handler,
      action: 'tap'
    });

    imageView.addGestureRecognizer(tap);
    imageView.userInteractionEnabled = true;
    return imageView;
  }

  /**
   * Initializes properties/listeners of the native view.
   */
  initNativeView(): void {
    /**
     * Generating color wheel by means of **CIFilter**
     * [Post with details]{@link https://noahgilmore.com/blog/cifilter-colorwheel}
     */
    const filter = CIFilter.filterWithNameWithInputParameters('CIHueSaturationValueGradient', {
      //@ts-ignore
      'inputColorSpace': CGColorSpaceCreateDeviceRGB(),
      'inputDither': 0,
      'inputRadius': this.radius,
      'inputSoftness': 0,
      'inputValue': 1
    });
    const image = new UIImage(filter.outputImage);
    this.nativeView.image = image;

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

}
