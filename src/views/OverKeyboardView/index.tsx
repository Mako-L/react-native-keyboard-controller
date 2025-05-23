import React, { useMemo } from "react";
import { Platform, StyleSheet, View } from "react-native";

import { RCTOverKeyboardView } from "../../bindings";
import { useWindowDimensions } from "../../hooks";

import type { OverKeyboardViewProps } from "../../types/views";
import type { PropsWithChildren } from "react";

/**
 * A view component that renders its children over the keyboard without closing the keyboard.
 * Acts similar to modal, but doesn't close the keyboard when it's visible.
 *
 * @param props - Component props.
 * @returns A view component that renders over the keyboard.
 * @example
 * ```tsx
 * <OverKeyboardView visible={true}>
 *   <Text>This will appear over the keyboard</Text>
 * </OverKeyboardView>
 * ```
 */
const OverKeyboardView = ({
  children,
  visible,
  height: propHeight,
  width: propWidth,
}: PropsWithChildren<OverKeyboardViewProps>) => {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const inner = useMemo(
    () => ({
      height: propHeight ?? windowHeight,
      width: propWidth ?? windowWidth,
    }),
    [propHeight, propWidth, windowHeight, windowWidth],
  );
  const style = useMemo(
    () => [
      styles.absolute,
      // On iOS - stretch view to full window dimensions to make yoga work
      Platform.OS === "ios" ? inner : undefined,
      // On Android - we are laid out by ShadowNode, so just stretch to full container
      Platform.OS === "android" ? styles.stretch : undefined,
    ],
    [inner],
  );

  return (
    <RCTOverKeyboardView visible={visible}>
      {/* `OverKeyboardView` should always have a single child */}
      <View collapsable={false} style={style}>
        {/* Match RN behavior and trigger mount/unmount when visibility changes */}
        {visible && children}
      </View>
    </RCTOverKeyboardView>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
  },
  stretch: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default OverKeyboardView;
