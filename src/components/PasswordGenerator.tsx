import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {COLORS} from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Slider} from '@miblanchard/react-native-slider';
import {generatePassword} from '../utils/generatePassword';

interface Props {
  triggerRegenerate?: () => void;
  password: string;
  setPassword: Dispatch<SetStateAction<Props['password']>>;
  regenerateCount: number;
  setRegenerateCount: Dispatch<SetStateAction<Props['regenerateCount']>>;
}

const PasswordGenerator = ({
  password,
  setPassword,
  regenerateCount,
  setRegenerateCount,
}: Props) => {
  const [passwordLength, setPasswordLength] = useState(12);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useLowerCase, setUseLowerCase] = useState(true);
  const [useUpperCase, setUseUpperCase] = useState(true);

  useEffect(() => {
    setPassword(
      generatePassword({
        passwordLength,
        useLowerCase,
        useNumbers,
        useSymbols,
        useUpperCase,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    regenerateCount,
    passwordLength,
    useSymbols,
    useNumbers,
    useLowerCase,
    useUpperCase,
  ]);

  return (
    <View>
      <View style={styles.passwordFieldWrapper}>
        <View style={styles.passwordFieldContainer}>
          <TextInput value={password} style={styles.textInput} />
          <TouchableOpacity
            onPress={() => setRegenerateCount(prev => prev + 1)}>
            <Ionicons name="sync" size={28} color={COLORS.black} />
          </TouchableOpacity>
        </View>
        <View style={styles.passwordAnalysisBar}>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: '70%',
              height: '100%',
              backgroundColor: COLORS.warning,
            }}
          />
        </View>
      </View>

      <View style={styles.formWrapper}>
        <View style={styles.inputContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Length</Text>

            <View style={styles.passwordLengthDisplayBox}>
              <Text style={styles.passwordLengthDisplayText}>
                {passwordLength}
              </Text>
            </View>
          </View>

          <Slider
            value={passwordLength}
            onValueChange={value => setPasswordLength(Math.ceil(value[0]))}
            startFromZero
            animationType="spring"
            minimumValue={6}
            maximumValue={40}
            containerStyle={styles.slider}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Numbers</Text>
            <Checkbox isChecked={useNumbers} setIsChecked={setUseNumbers} />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Symbols</Text>
            <Checkbox isChecked={useSymbols} setIsChecked={setUseSymbols} />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Lowecase</Text>
            <Checkbox isChecked={useLowerCase} setIsChecked={setUseLowerCase} />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Uppercase</Text>
            <Checkbox isChecked={useUpperCase} setIsChecked={setUseUpperCase} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default PasswordGenerator;

const styles = StyleSheet.create({
  passwordFieldWrapper: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.grey2,
    borderRadius: 8,
    overflow: 'hidden',
    borderBottomWidth: 0,
  },
  passwordFieldContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
  },
  passwordAnalysisBar: {
    height: 6,
    backgroundColor: COLORS.grey3,
    borderBottomEndRadius: 8,
  },
  passwordAnalysisBarInner: {
    height: '100%',
  },
  formWrapper: {
    gap: 24,
    marginTop: 8,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
  label: {
    fontSize: 16,
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    height: 30,
  },
  passwordLengthDisplayBox: {
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.grey2,
    borderRadius: 6,
  },
  passwordLengthDisplayText: {
    fontSize: 16,
  },

  button: {
    padding: 13,

    backgroundColor: '#007bff',

    color: '#fff',

    borderRadius: 5,

    overflow: 'hidden',

    textAlign: 'center',

    fontSize: 16,

    fontWeight: 'bold',

    margin: 15,
  },

  buttonText: {
    color: '#fff',

    fontSize: 16,

    fontWeight: 'bold',
  },

  copyButton: {
    marginLeft: 10,

    backgroundColor: '#007bff',

    color: '#fff',

    borderRadius: 5,

    overflow: 'hidden',

    padding: 10,

    fontSize: 14,
  },

  successMessage: {
    color: 'green',

    textAlign: 'center',

    fontSize: 20,
  },
});

interface CheckboxProps {
  isChecked: boolean;
  setIsChecked: Dispatch<SetStateAction<CheckboxProps['isChecked']>>;
}

const Checkbox = ({isChecked, setIsChecked}: CheckboxProps) => {
  return (
    <TouchableOpacity
      onPress={() => setIsChecked(prev => !prev)}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isChecked ? COLORS.blue : COLORS.white,
        borderWidth: isChecked ? 0 : 1,
        borderColor: COLORS.black,
        borderRadius: 8,
      }}>
      <MaterialCommunityIcons name="check" size={16} color={COLORS.white} />
    </TouchableOpacity>
  );
};
