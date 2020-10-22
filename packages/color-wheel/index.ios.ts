import { Color, GridLayout, Label, LayoutBase, Trace, View } from '@nativescript/core';
import { ColorWheelCommon } from '@sergeymell/color-wheel/common';
import Layout = Trace.categories.Layout;
import { Pointer } from '@nativescript/core/ui/gestures';

@NativeClass
class TapHandler extends NSObject {

  public tap(args) {

    // Gets the owner from the nativeView.
    const x = args.locationInView(args.view).x;
    const y = args.locationInView(args.view).y;
    console.log('args', args.view);
    console.log('args', args.view.image);
    let pixel = malloc(4 * interop.sizeof(interop.types.uint8));
    console.log(1);
    let colorSpace = CGColorSpaceCreateDeviceRGB();
    console.log(2);
    let bitmapInfo = CGImageGetBitmapInfo(args.view)
    console.log(3);
    let context = CGBitmapContextCreate(
      pixel,
      1,
      1,
      8,
      4,
      colorSpace,
      CGImageAlphaInfo.kCGImageAlphaPremultipliedFirst
    );
    console.log('context');
    console.log(context);

    CGContextTranslateCTM(context, -x, -y);
    args.view.layer.renderInContext(context)



    console.log('pixel');
    console.log(pixel);

    var reference = new interop.Reference(interop.types.uint8, pixel);
    console.log(reference[0], reference[1], reference[2], reference[3]);

    const color = UIColor.colorWithRedGreenBlueAlpha(
      pixel[0] / 255.0,
      pixel[1] / 255.0,
      pixel[2] / 255.0,
      pixel[3] / 255.0
    )
    CGColorSpaceRelease( colorSpace );
    console.log('color');
    console.log(color);
    /** Continue with
     * https://stackoverflow.com/questions/12770181/how-to-get-the-pixel-color-on-touch
     */

    //   context.translateBy(x, y)
  //   layer.render(in: context!)
  //   let color = UIColor(
  //     red: CGFloat(pixel[0]) / 255.0,
  //     green: CGFloat(pixel[1]) / 255.0,
  //     blue: CGFloat(pixel[2]) / 255.0,
  //     alpha: CGFloat(pixel[3]) / 255.0
  // )
  }

  public static ObjCExposedMethods = {
    "tap": { returns: interop.types.void, params: [interop.types.id, interop.types.id] }
  };
}

const handler = new TapHandler();

export class ColorWheel extends View {

  nativeView: UIImageView;

  /**
   * Creates new image view.
   */
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
    // Attach the owner to nativeView.
    // When nativeView is tapped we get the owning JS object through this field.

    const filter = CIFilter.filterWithNameWithInputParameters('CIHueSaturationValueGradient', {
      //@ts-ignore
      'inputColorSpace': CGColorSpaceCreateDeviceRGB(),
      'inputDither': 0,
      'inputRadius': this.width,
      'inputSoftness': 0,
      'inputValue': 1
    });
    const image = new UIImage(filter.outputImage);
    this.nativeView.image = image;

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
