import { Component, NgZone, ViewContainerRef } from '@angular/core';
import { Color } from '@nativescript/core';
import { ModalDialogService } from '@nativescript/angular';

@Component({
  selector: 'ColorPickerModal',
  template: `
    <StackLayout backgroundColor="white" marginTop="50%">
      <ColorWheel width="200" height="200" margin="20"
                  (colorSelect)="onColorSelected($event)"></ColorWheel>
    </StackLayout>
  `
})
export class ColorPickerModalComponent {

  constructor() {
  }

  onColorSelected(args) {
    args.object.parent.closeModal({
      color: args.object.color
    });
  }
}

@Component({
  selector: 'demo-color-wheel',
  templateUrl: 'nativescript-color-wheel.component.html'
})
export class ColorWheelComponent {
  color: Color = new Color('#8A87FF');

  constructor(private _ngZone: NgZone,
              private vcRef: ViewContainerRef,
              private modal: ModalDialogService
  ) {
  }

  changeColorModal() {
    this.modal.showModal(ColorPickerModalComponent, {
      viewContainerRef: this.vcRef,
      fullscreen: false,
      context: {
        color: this.color
      }
    }).then(state => {
      if (state && state.color) {
        this.color = state.color;
      }
    });
  }
}
