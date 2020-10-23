# NativeScript Color Wheel

## Description
This plugin is actually a color picker plugin which can be used 
as a simple component wherever you need it. It allows you to  
- pick a color by clicking appropriate position on the color wheel
- render whatever UI as a picker icon customizing it on your own needs
- set an initial color for the plugin
- put the color picker wherever you need it as long it's just a custom element.

Plugin works simultaneously for both iOS and Android platforms and 
is not based on any additional libraries, CocoaPods etc

### Examples
|Color wheel with custom selection picker|Color picker in a modal dialog|
|---|---|
|![][1]|![][2]|

[1]: https://github.com/SergeyMell/nativescript-plugins/blob/assets/android-with-picker.gif?raw=true
[2]: https://github.com/SergeyMell/nativescript-plugins/blob/assets/ios-modal.gif?raw=true

## Installation
```javascript
ns plugin add @sergeymell/color-wheel
```
## Usage
### In NativeScript Core applications:
```xml
<clw:ColorWheel width="200" height="200" color="#FFB35E"
                            colorSelect="{{colorSelected}}"/>
```
### In NativeScript Angular applications:
1. Add `NativeScriptColorWheelModule` from `@sergeymell/color-wheel/angular` to the `imports` section of your Angular module
2. Use the `ColorWheel` component where you need it
```html
<ColorWheel width="200" height="200" margin="20"
                  (colorSelect)="onColorSelected($event)"></ColorWheel>
```

### TODOs:
- optimize the algorithm of initial color location determination
- make color brightness configurable (at least for Android)
- add support of other color selection area forms (i.e. square) 

## License

Apache License Version 2.0
