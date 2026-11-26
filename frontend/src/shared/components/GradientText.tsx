import React from 'react';
import { Text, TextStyle, ViewStyle, StyleProp } from 'react-native';
import MaskedViewBase from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

// Cast needed: the package's types clash with React 19 types
const MaskedView = MaskedViewBase as unknown as React.ComponentType<
  React.PropsWithChildren<{ style?: StyleProp<ViewStyle>; maskElement: React.ReactElement }>
>;
type Props = {
  children: string;
  style?: StyleProp<TextStyle>;
  colors: readonly [string, string, ...string[]];
  locations?: readonly [number, number, ...number[]];
};

// Text filled with a left-to-right gradient
export function GradientText({ children, style, colors, locations }: Props) {
  return (
    <MaskedView
      style={{ alignSelf: 'flex-start' }}
      maskElement={<Text style={style}>{children}</Text>}
    >
      <LinearGradient
        colors={colors}
        locations={locations}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <Text style={[style, { opacity: 0 }]}>{children}</Text>
      </LinearGradient>
    </MaskedView>
  );
}
