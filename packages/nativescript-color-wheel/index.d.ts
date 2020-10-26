import { Color, EventData } from '@nativescript/core';
import { Property } from '@nativescript/core/ui/core';
import { View } from '@nativescript/core/ui/core/view';

/**
 * Declare color wheel definitions
 */
export class ColorWheel extends View {

  static colorSelectEvent = 'colorSelect';

  on(event: 'colorSelect', callback: (args: EventData) => void);
  on(eventNames: string, callback: (data: EventData) => void, thisArg?: any);
}

export const colorProperty: Property<ColorWheel, string | Color>;

export interface ColorSelectEvent {
  color: Color;
  position: {
    x: number;
    y: number;
  }
  owner: ColorWheel
}
