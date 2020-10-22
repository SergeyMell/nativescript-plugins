import { ColorWheelCommon } from './common';

export declare class ColorWheel extends View {

  static colorSelectEvent = 'colorSelect';

  on(event: 'colorSelect', callback: (args) => void);
  on(eventNames: string, callback: (data: EventData) => void, thisArg?: any);

}
