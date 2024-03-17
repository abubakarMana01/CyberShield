import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import CountryPickerModal from './CountryPickerModal';
import {Country} from '../utils/country';
import Text from './Text';
import {COLORS} from '../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  onCountrySelect: (country: Country) => void;
  fullHeight?: boolean;
  bgColor?: string;
  showArrow?: boolean;
  selectedCountry: Country;
}

const SelectCountry: React.FC<Props> = ({
  onCountrySelect,
  fullHeight,
  bgColor,
  showArrow,
  selectedCountry,
}) => {
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);

  const handleCountrySelect = (country: any) => {
    onCountrySelect(country);
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.contryCodeContainer,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            height: fullHeight ? '100%' : 'auto',
            backgroundColor: bgColor || COLORS.successLight,
          },
        ]}
        onPress={() => setIsCountryModalVisible(true)}>
        <Text>{selectedCountry?.flag}</Text>

        <Text style={styles.text}>{selectedCountry?.dialCode}</Text>

        {showArrow && (
          <MaterialCommunityIcons
            size={16}
            name="chevron-down"
            color={COLORS.grey}
          />
        )}
      </TouchableOpacity>

      <CountryPickerModal
        isVisible={isCountryModalVisible}
        onSelectCountry={handleCountrySelect}
        onClose={() => setIsCountryModalVisible(false)}
      />
    </>
  );
};

export default SelectCountry;

const styles = StyleSheet.create({
  contryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    padding: 6,
    borderRadius: 4,
    gap: 4,
  },
  text: {
    fontSize: 12,
  },
});
