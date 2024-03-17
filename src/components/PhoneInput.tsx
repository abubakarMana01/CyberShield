import React, {Dispatch, SetStateAction} from 'react';

import {AppTextInputProps} from './TextInput';
import {View} from 'react-native';
import {TextInput} from '.';
import SelectCountry from './SelectCountry';
import {Country} from '../utils/country';

interface Props {
  countryCode: string;
  selectedCountry: Country;
  setSelectedCountry: Dispatch<SetStateAction<Props['selectedCountry']>>;
}

type PhoneInputProps = Props & AppTextInputProps;

const PhoneInput: React.FC<PhoneInputProps> = props => {
  const {selectedCountry, setSelectedCountry} = props;

  const onSelectCountry = (country: Country) => {
    setSelectedCountry(country);
  };

  return (
    <TextInput
      leftComponent={
        <View style={{marginLeft: -8, marginRight: 4}}>
          <SelectCountry
            selectedCountry={selectedCountry}
            onCountrySelect={onSelectCountry}
            fullHeight
            showArrow
          />
        </View>
      }
      {...props}
    />
  );
};

export default PhoneInput;
