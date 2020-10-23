import { Color, isIOS, Property, View } from '@nativescript/core';
import { Screen } from '@nativescript/core/platform/index.ios';

export const colorProperty = new Property<ColorWheelCommon, string>({
  name: 'color',
  defaultValue: '',
  // affectsLayout: isIOS
});

export class ColorWheelCommon extends View {

  /**
   * Defining the static method in order to be possible
   * to handle in views
   */
  static colorSelectEvent = 'colorSelect';

  color: Color;

  /**
   * Define the radius of color wheel on the basis of provided sizes or screen size
   * @protected
   */
  protected get radius(): number {
    const width = this.width;
    const height = this.height;
    let minBound;
    if (typeof width === 'number' && typeof height === 'number') {
      minBound = width < height ? width : height;
    } else {
      minBound = Screen.mainScreen.widthDIPs;
    }
    return minBound / 2;
  }
}

colorProperty.register(ColorWheelCommon);
