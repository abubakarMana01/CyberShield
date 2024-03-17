import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigate} from '../hooks';
import {ROUTES} from '../navs/routes';
import Text from './Text';
import {COLORS} from '../constants/colors';

interface Props {
  variant: 'login' | 'register';
}

const ChangeAuthView: React.FC<Props> = ({variant}) => {
  const {navigate} = useNavigate();

  const handlePress = () => {
    if (variant === 'login') {
      navigate(ROUTES.LOGIN);
    } else if (variant === 'register') {
      navigate(ROUTES.REGISTER);
    }
  };

  return (
    <View style={styles.accountSelectOption}>
      <Text style={styles.text1}>
        {variant === 'login'
          ? 'Already have an account? '
          : variant === 'register'
          ? "Don't have an account? "
          : ''}
      </Text>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.text2}>
          {variant === 'login'
            ? 'Log In'
            : variant === 'register'
            ? 'Create one'
            : ''}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangeAuthView;

const styles = StyleSheet.create({
  accountSelectOption: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 'auto',
  },
  text1: {
    fontSize: 16,
  },
  text2: {
    color: COLORS.grey,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});
