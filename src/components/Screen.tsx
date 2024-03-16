import {StyleSheet, View, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {StyleProp} from 'react-native';

interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Screen = ({children, style}: Props) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 0,
  },
});
