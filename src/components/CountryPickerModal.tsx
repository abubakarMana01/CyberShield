import React from 'react';
import {
  View,
  Modal,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import Screen from './Screen';
import Text from './Text';
import {Country, countryData} from '../utils/country';
import {COLORS} from '../constants/colors';

interface CountryPickerModalProps {
  isVisible: boolean;
  onSelectCountry: (country: Country) => void;
  onClose: () => void;
}

const CountryPickerModal: React.FC<CountryPickerModalProps> = ({
  isVisible,
  onSelectCountry,
  onClose,
}) => {
  const handleCountrySelect = (country: Country) => {
    onSelectCountry(country);
    onClose();
  };

  const renderCountryItem = ({item}: {item: Country}) => (
    <TouchableOpacity onPress={() => handleCountrySelect(item)}>
      <View style={styles.countryItem}>
        <Text style={styles.flag}>{item.flag}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.rightText}>{item.dialCode}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal visible={isVisible} animationType="slide">
      <SafeAreaView style={styles.container}>
        <Screen>
          <FlatList
            data={countryData}
            renderItem={renderCountryItem}
            keyExtractor={item => item.dialCode}
          />
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </Screen>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  flag: {
    fontSize: 20,
    marginRight: 10,
  },
  name: {
    flex: 1,
    marginRight: 10,
  },
  rightText: {},
  closeButton: {
    marginTop: 20,
    fontSize: 18,
    color: COLORS.blue,
  },
});

export default CountryPickerModal;
