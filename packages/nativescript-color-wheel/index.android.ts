import * as common from './common';
import { ColorWheel as ColorWheelDefinition } from '.';
import { Color } from '@nativescript/core';
global.moduleMerge(common, exports);

const DEFAULT_ALPHA = 50;

let touchListener: android.view.View.OnTouchListener;

/**
 * Implementation of color getter is done on the basis of
 * {@link http://android-er.blogspot.com/2012/10/get-touched-pixel-color-of-scaled.html}
 *
 * @NOTE: ClickListenerImpl is in function instead of directly in the module because we
 * want this file to be compatible with V8 snapshot. When V8 snapshot is created
 * JS is loaded into memory, compiled & saved as binary file which is later loaded by
 * Android runtime. Thus when snapshot is created we don't have Android runtime and
 * we don't have access to native types.
 */
function initializeClickListener(): void {
  // Define ClickListener class only once.
  if (touchListener) {
    return;
  }

  // Interfaces decorator with implemented interfaces on this class
  @NativeClass
  @Interfaces([android.view.View.OnTouchListener])
  class ClickListener extends java.lang.Object implements android.view.View.OnTouchListener {
    public owner: ColorWheel;

    constructor() {
      super();
      // Required by Android runtime when native class is extended through TypeScript.
      return global.__native(this);
    }

    public onTouch(view: android.view.View, event: android.view.MotionEvent): boolean {
      // Handle only tap end
      if (event.getAction() !== android.view.KeyEvent.ACTION_UP) {
        return true;
      }

      /** Get the rendered bitmap  */
      const imgDrawable = (<android.widget.ImageView>view).getDrawable();
      // @ts-ignore
      const bitmap = imgDrawable.getBitmap();

      /** Define the coordinates of the tap */
      const eventXY = Array.create('float', 2);
      eventXY[0] = event.getX();
      eventXY[1] = event.getY();

      const invertMatrix = new android.graphics.Matrix();
      (<android.widget.ImageView>view).getImageMatrix().invert(invertMatrix);

      invertMatrix.mapPoints(eventXY);
      let x = eventXY[0];
      let y = eventXY[1];

      // Limit x, y range within bitmap
      if (x < 0) {
        x = 0;
      } else if (x > bitmap.getWidth() - 1) {
        x = bitmap.getWidth() - 1;
      }

      if (y < 0) {
        y = 0;
      } else if (y > bitmap.getHeight() - 1) {
        y = bitmap.getHeight() - 1;
      }

      /** Get color at the point of tap */
      const touchedRGB = bitmap.getPixel(x, y);
      const owner = (<any>view).owner;
      if (touchedRGB && owner) {
        owner.notify({
          eventName: 'colorSelect',
          object: Object.assign({}, owner, {
            isFirstChange: false,
            color: new Color(touchedRGB),
            colorPosition: { x, y }
          })
        });
      }
      return true;
    }

  }

  touchListener = new ClickListener();
}

/**
 * Drawing of color wheel is implementing accourding the the next posts
 * {@link https://medium.com/@yarolegovich/color-wheel-efficient-drawing-with-shaders-aa11c0f6e46c}
 * {@link https://github.com/yarolegovich/ColorWheelView/blob/master/app/src/main/java/com/yarolegovich/colorwheelshader/ColorWheelView.java}
 * {@link https://medium.com/@info_25865/how-to-create-a-canvas-in-nativescript-90c47b067b4b}
 */
export class ColorWheel extends common.ColorWheelCommon implements ColorWheelDefinition {

  // added for TypeScript intellisense.
  nativeView: android.widget.ImageView;

  public createNativeView(): Object {
    /** Define all the instances to operate with */
    const radius = this.radius;
    const view = new android.widget.ImageView(this._context);
    const bitmap = android.graphics.Bitmap.createBitmap(
      2 * radius, 2 * radius,
      android.graphics.Bitmap.Config.ARGB_8888
    );
    const canvas = new android.graphics.Canvas(bitmap);

    /** Generate click listener instance */
    initializeClickListener();

    /** Define shaders */
    const huePaint = new android.graphics.Paint(android.graphics.Paint.ANTI_ALIAS_FLAG);
    const hueShader = new android.graphics.SweepGradient(radius, radius, colorSpectra(), colorDistribution());
    huePaint.setShader(hueShader);

    const saturationPaint = new android.graphics.Paint(android.graphics.Paint.ANTI_ALIAS_FLAG);
    const satShader = new android.graphics.RadialGradient(radius, radius, radius,
      android.graphics.Color.WHITE, 0x00FFFFFF,
      android.graphics.Shader.TileMode.CLAMP);
    saturationPaint.setShader(satShader);

    // NOTE: This can be added to modify the brightness of the app
    // const brightnessOverlayPaint = new android.graphics.Paint(android.graphics.Paint.ANTI_ALIAS_FLAG);
    // brightnessOverlayPaint.setColor(android.graphics.Color.BLACK);
    // brightnessOverlayPaint.setAlpha(DEFAULT_ALPHA);

    /** Draw shaders on canvas */
    canvas.drawCircle(radius, radius, radius, huePaint);
    canvas.drawCircle(radius, radius, radius, saturationPaint);
    // canvas.drawCircle(radius, radius, radius, brightnessOverlayPaint);

    view.setImageBitmap(bitmap);

    /** Define listeners */
    view.setOnTouchListener(touchListener);

    return view;
  }

  /**
   * Initializes properties/listeners of the native view.
   */
  initNativeView(): void {
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

  /**
   * TODO: This is an algorithm of full range. It's definitely not optimal
   *       should think about something better
   */
  [common.colorProperty.setNative](value: string | Color) {
    const color = value instanceof Color ? value : new Color(value);

    const imgDrawable = this.nativeView.getDrawable();
    // @ts-ignore
    const bitmap = imgDrawable.getBitmap();
    const bitmapWidth = bitmap.getWidth();
    const bitmapHeight = bitmap.getHeight();

    let resX = -1;
    let resY = -1;
    let metrics = 10;
    for (let x = 0; x < bitmapWidth; x++) {
      for (let y = 0; y < bitmapHeight; y++) {
        const touchedRGB = bitmap.getPixel(x, y);
        const touchedColor = new Color(touchedRGB);
        const distance = Math.abs(touchedColor.r - color.r) +
          Math.abs(touchedColor.g - color.g) +
          Math.abs(touchedColor.b - color.b);
        if (distance < metrics) {
          metrics = distance;
          resX = x;
          resY = y;
        }
      }
    }
    if (resX > -1 && resY > -1) {
      this.notify({
        eventName: 'colorSelect',
        object: Object.assign({}, this, {
          isFirstChange: true,
          color,
          colorPosition: { x: resX, y: resY }
        })
      });
    }
  }
}

export function colorSpectra() {
  const colors = Array.create('int', 7);
  colors[0] = android.graphics.Color.RED;
  colors[1] = android.graphics.Color.MAGENTA;
  colors[2] = android.graphics.Color.BLUE;
  colors[3] = android.graphics.Color.CYAN;
  colors[4] = android.graphics.Color.GREEN;
  colors[5] = android.graphics.Color.YELLOW;
  colors[6] = android.graphics.Color.RED;
  return colors;
}

export function colorDistribution() {
  const sectors = Array.create('float', 7);
  sectors[0] = 0.000;
  sectors[1] = 0.166;
  sectors[2] = 0.333;
  sectors[3] = 0.499;
  sectors[4] = 0.666;
  sectors[5] = 0.833;
  sectors[6] = 0.999;
  return sectors;
}
