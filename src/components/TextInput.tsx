import {
  StyleSheet,
  View,
  TextInput as RNTextInput,
  InputModeOptions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import {COLORS} from '../constants/colors';
import Text from './Text';
import Ionicons from 'react-native-vector-icons/Ionicons';

export interface AppTextInputProps {
  placeholder?: string;
  label?: string;
  autoFocus?: boolean;
  autoCapitalize?: 'none' | 'words' | 'sentences' | 'characters';
  leftComponent?: JSX.Element;
  rightComponent?: JSX.Element;
  inputMode?: InputModeOptions;
  secureTextEntry?: boolean;
  editable?: boolean;

  // Hook form
  control?: Control<FieldValues>;
  name: string;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}

const TextInputController: React.FC<AppTextInputProps> = ({
  label,
  placeholder,
  autoFocus,
  autoCapitalize,
  leftComponent,
  rightComponent,
  inputMode = 'text',
  secureTextEntry,
  editable,

  control,
  name,
  rules = {},
}) => {
  const [showPassword, setShowPassword] = useState(!!secureTextEntry);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: {value, onChange, onBlur},
        fieldState: {error, isDirty},
      }) => {
        const borderColor = error
          ? COLORS.danger
          : !isDirty
          ? COLORS.greyLight
          : COLORS.success;
        const backgroundColor = error
          ? COLORS.dangerLight
          : !isDirty
          ? 'transparent'
          : COLORS.successLight;

        return (
          <View>
            {label && <Text style={styles.label}>{label}</Text>}

            <View
              style={[
                styles.textInputWrapper,
                {
                  borderColor,
                  backgroundColor,
                },
              ]}>
              {leftComponent ? leftComponent : null}
              <View style={styles.textInputContainer}>
                <RNTextInput
                  placeholder={placeholder}
                  style={styles.textInput}
                  autoFocus={autoFocus}
                  autoCapitalize={autoCapitalize}
                  inputMode={inputMode}
                  secureTextEntry={showPassword}
                  editable={editable}
                  // Hook form
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              </View>
              {secureTextEntry ? (
                <PasswordSecure
                  toggleMode={() => setShowPassword(prev => !prev)}
                  showPassword={showPassword}
                />
              ) : rightComponent ? (
                rightComponent
              ) : null}
            </View>
            {error && <ErrorMessage error={error.message || 'Error'} />}
          </View>
        );
      }}
    />
  );
};

export default TextInputController;

const ErrorMessage: React.FC<{error: string}> = ({error}) => (
  <>{error ? <Text style={styles.error}>{error}</Text> : null}</>
);

const PasswordSecure: React.FC<{
  toggleMode: () => void;
  showPassword: boolean;
}> = ({toggleMode, showPassword}) => (
  <TouchableOpacity style={styles.secureTextEntryIcon} onPress={toggleMode}>
    {showPassword && (
      <Ionicons
        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
        color={COLORS.grey2}
      />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
  },
  textInputWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.greyLight,
    flexDirection: 'row',
    alignItems: 'center',
    height: Platform.select({ios: 48, android: 53}),
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  textInputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
  },
  secureTextEntryIcon: {
    marginLeft: 16,
  },
  error: {
    fontSize: 12,
    color: COLORS.danger,
    marginTop: 4,
  },
});
