import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/colors';
import Text from './Text';

interface Props {
  text: string;
  handleClick: () => void;
  disabled?: boolean;
  variant?: 'default' | 'secondary';
  textStyles?: TextStyle;
  containerStyles?: ViewStyle;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

const AppButton: React.FC<Props> = ({
  text,
  handleClick,
  disabled,
  textStyles = {},
  containerStyles = {},
  icon,
  variant = 'default',
  isLoading,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled || false}
      onPress={handleClick}
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor:
            disabled && variant === 'default'
              ? '#AC9CBA'
              : variant === 'secondary'
              ? 'transparent'
              : COLORS.primary,
          borderColor: variant === 'secondary' ? COLORS.grey2 : 'auto',
          borderWidth: variant === 'secondary' ? 1 : 0,
        },
        containerStyles,
      ]}
      activeOpacity={0.7}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          {icon ? (
            icon
          ) : (
            <Text
              style={[
                styles.buttonText,
                {
                  color:
                    variant === 'secondary' ? COLORS.primary : COLORS.white,
                },

                textStyles,
              ]}>
              {text}
            </Text>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    width: '100%',
    height: 56,
    flexDirection: 'row',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    paddingHorizontal: 12,
  },
});
