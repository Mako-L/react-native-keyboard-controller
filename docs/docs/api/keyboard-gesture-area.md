---
sidebar_position: 4
title: KeyboardGestureArea
keywords:
  [
    react-native-keyboard-controller,
    KeyboardGestureArea,
    interactive keyboard,
    view,
  ]
---

`KeyboardGestureArea` allows you to define a region on the screen, where gestures will control the keyboard position.

:::info Platform availability
This component is available only for Android >= 11. For iOS and Android < 11 it will render `React.Fragment`.
:::

## Props

### `offset`

Extra distance to the keyboard. Default is `0`.

### `interpolator` <div className="label android"></div>

String with possible values `linear` and `ios`:

- **ios** - interactive keyboard dismissing will work as in iOS: swipes in non-keyboard area will not affect keyboard positioning, but if your swipe touches keyboard - keyboard will follow finger position.
- **linear** - gestures inside the component will linearly affect the position of the keyboard, i.e. if the user swipes down by 20 pixels, then the keyboard will also be moved down by 20 pixels, even if the gesture was not made over the keyboard area.

### `showOnSwipeUp` <div className="label android"></div>

A boolean prop which allows to customize interactive keyboard behavior. If set to `true` then it allows to show keyboard (if it's already closed) by swipe up gesture. `false` by default.

### `enableSwipeToDismiss` <div className="label android"></div>

A boolean prop which allows to customize interactive keyboard behavior. If set to `false`, then any gesture will not affect keyboard position if the keyboard is shown. `true` by default.

### `textInputNativeID` <div className="label ios"></div>

A corresponding `nativeID` value from the corresponding `TextInput`.

## Example

```tsx
<KeyboardGestureArea
  interpolator="ios"
  offset={50}
  textInputNativeID="composer"
>
  <ScrollView>
    {/* The other UI components of application in your tree */}
  </ScrollView>
  <TextInput nativeID="composer" />
</KeyboardGestureArea>
```
