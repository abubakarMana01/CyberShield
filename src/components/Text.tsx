import {StyleSheet, Text as RNText, TextStyle, StyleProp} from 'react-native';
import React from 'react';

interface Props {
  children: string | React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const Text: React.FC<Props> = ({children, style = {}}) => {
  return <RNText style={[styles.text, style]}>{children}</RNText>;
};

export default Text;

const styles = StyleSheet.create({
  text: {},
});
