import React, { forwardRef, useMemo } from "react";
import { Animated } from "react-native";

import { useKeyboardAnimation } from "../../hooks";

import type { View, ViewProps } from "react-native";

export type KeyboardStickyViewProps = {
  /**
   * Specify additional offset to the view for given keyboard state.
   */
  offset?: {
    /**
     * Adds additional `translateY` when keyboard is close. By default `0`.
     */
    closed?: number;
    /**
     * Adds additional `translateY` when keyboard is open. By default `0`.
     */
    opened?: number;
  };

  /** Controls whether this `KeyboardStickyView` instance should take effect. Default is `true` */
  enabled?: boolean;
} & ViewProps;

const KeyboardStickyView = forwardRef<
  View,
  React.PropsWithChildren<KeyboardStickyViewProps>
>(
  (
    {
      children,
      offset: { closed = 0, opened = 0 } = {},
      style,
      enabled = true,
      ...props
    },
    ref,
  ) => {
    const { height, progress } = useKeyboardAnimation();

    const offset = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [closed, opened],
    });

    const styles = useMemo(
      () => [
        {
          transform: [
            { translateY: enabled ? Animated.add(height, offset) : closed },
          ],
        },
        style,
      ],
      [closed, enabled, height, offset, style],
    );

    return (
      <Animated.View ref={ref} style={styles} {...props}>
        {children}
      </Animated.View>
    );
  },
);

export default KeyboardStickyView;
