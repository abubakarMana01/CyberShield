import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Screen} from '../components';
import {COLORS} from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Clipboard from '@react-native-clipboard/clipboard';
import {showToast} from '../utils';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
    showToast('Copied!');
  };

  return (
    <Screen>
      <View
        style={{
          paddingVertical: 12,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 8,
          backgroundColor: COLORS.greyLight,
          minHeight: 45,
          marginBottom: 24,
        }}>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{flex: 1}}
          placeholder="Search here..."
        />
        <Ionicons name="search" size={21} color={COLORS.grey} />
      </View>
      <FlatList
        data={DATA.filter(
          data =>
            data.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            data.identifier.toLowerCase().includes(searchQuery.toLowerCase()),
        )}
        keyExtractor={(item, index) => item.title + item.identifier + index}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.row}>
            <View style={styles.rowImg}>
              <AntDesign name="android1" size={30} color={COLORS.greyDark} />
            </View>
            <View>
              <Text style={styles.passwordTitle}>{item.title}</Text>
              <Text style={styles.passwordIdentifier}>{item.identifier}</Text>
            </View>
            <TouchableOpacity
              onPress={() => copyToClipboard(item.password)}
              style={styles.copyIconContainer}>
              <Ionicons name="copy-outline" size={24} />
            </TouchableOpacity>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </Screen>
  );
};

export default Search;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowImg: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: COLORS.greyLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemSeparator: {
    height: 12,
  },
  passwordTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  passwordIdentifier: {
    color: COLORS.greyDark,
    marginTop: 4,
  },
  sectionSeparator: {
    height: 20,
  },
  copyIconContainer: {
    marginLeft: 'auto',
    opacity: 0.8,
    marginRight: 6,
  },
});

const DATA = [
  {
    title: 'Apple',
    identifier: 'faizaolagunju@gmail.com',
    password: 'test1234',
  },
  {
    title: 'Adobe',
    identifier: 'faizaolagunju@gmail.com',
    password: 'test1234',
  },
  {
    title: 'Netflix',
    identifier: 'faizaolagunju@gmail.com',
    password: 'test1234',
  },
  {
    title: 'Snapchat',
    identifier: 'snapfaiza@gmail.com',
    password: 'test1234',
  },
  {
    title: 'Spotify',
    identifier: 'faizaspotify@gmail.com',
    password: 'test1234',
  },
  {
    title: 'Slack',
    identifier: 'faizaolagunju@gmail.com',
    password: 'test1234',
  },
  {
    title: 'Adobe',
    identifier: 'faizaolagunju@gmail.com',
    password: 'test1234',
  },
];
