import { ColorWheelCommon } from './common';
import { View } from '@nativescript/core';

/**
 * https://medium.com/@yarolegovich/color-wheel-efficient-drawing-with-shaders-aa11c0f6e46c
 * https://github.com/yarolegovich/ColorWheelView/blob/master/app/src/main/java/com/yarolegovich/colorwheelshader/ColorWheelView.java
 * https://medium.com/@info_25865/how-to-create-a-canvas-in-nativescript-90c47b067b4b
 */

export class ColorWheel extends View {

  // added for TypeScript intellisense.
  nativeView: android.widget.ImageView;

  /**
   * Creates new native button.
   */
  public createNativeView(): Object {
    // Create new instance of android.widget.Button.
    const bitmap = android.graphics.Bitmap.createBitmap(100, 100, android.graphics.Bitmap.Config.ARGB_8888);
    const canvas = new android.graphics.Canvas(bitmap);

    const huePaint = new android.graphics.Paint(android.graphics.Paint.ANTI_ALIAS_FLAG);
    const saturationPaint = new android.graphics.Paint(android.graphics.Paint.ANTI_ALIAS_FLAG);
    const brightnessOverlayPaint = new android.graphics.Paint(android.graphics.Paint.ANTI_ALIAS_FLAG);
    brightnessOverlayPaint.setColor(android.graphics.Color.BLACK);
    brightnessOverlayPaint.setAlpha(50);

    const colors = Array.create('int', 7);
    colors[0] = android.graphics.Color.RED
    colors[1] = android.graphics.Color.MAGENTA
    colors[2] = android.graphics.Color.BLUE
    colors[3] = android.graphics.Color.CYAN
    colors[4] = android.graphics.Color.GREEN
    colors[5] = android.graphics.Color.YELLOW
    colors[6] = android.graphics.Color.RED

    const vars = Array.create('float', 7);
    vars[0] = 0.000;
    vars[1] = 0.166;
    vars[2] = 0.333;
    vars[3] = 0.499;
    vars[4] = 0.666;
    vars[5] = 0.833;
    vars[6] = 0.999;

    const hueShader = new android.graphics.SweepGradient(50, 50, colors, vars);
    huePaint.setShader(hueShader);

    const satShader = new android.graphics.RadialGradient(50, 50, 50,
      android.graphics.Color.WHITE, 0x00FFFFFF,
      android.graphics.Shader.TileMode.CLAMP);
    saturationPaint.setShader(satShader)

    const view = new android.widget.ImageView(this._context);
    // set onClickListener on the nativeView.

    canvas.drawCircle(50, 50, 50, huePaint);
    canvas.drawCircle(50, 50, 50, saturationPaint);
    canvas.drawCircle(50, 50, 50, brightnessOverlayPaint);

    view.setImageBitmap(bitmap);

    return view;
  }

  /**
   * Initializes properties/listeners of the native view.
   */
  initNativeView(): void {
    // Attach the owner to nativeView.
    // When nativeView is tapped we get the owning JS object through this field.
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
    // Remove reference from native view to this instance.
    (<any>this.nativeView).owner = null;

    // If you want to recycle nativeView and have modified the nativeView
    // without using Property or CssProperty (e.g. outside our property system - 'setNative' callbacks)
    // you have to reset it to its initial state here.
    super.disposeNativeView();
  }
}
