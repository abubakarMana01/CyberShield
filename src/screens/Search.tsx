import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Screen} from '../components';
import {COLORS} from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Clipboard from '@react-native-clipboard/clipboard';
import {showToast} from '../utils';
import {useNavigate} from '../hooks';
import {ROUTES} from '../navs/routes';
import {useAppContext} from '../contexts/AppProvider';
import useRecords from '../hooks/useRecords';
import LoaderView from '../components/LoaderView';
import {useNavigation} from '@react-navigation/native';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const {navigate} = useNavigate();
  const {records} = useAppContext();
  const {isLoading, refetch} = useRecords();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      refetch();
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
    showToast('Copied!');
  };

  if (isLoading && !records) {
    return <LoaderView />;
  }

  return (
    <Screen>
      <View style={styles.searchInputContainer}>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{flex: 1}}
          placeholder="Search here..."
          placeholderTextColor={COLORS.grey}
          autoFocus
          clearButtonMode="while-editing"
        />
        <Ionicons name="search" size={21} color={COLORS.grey} />
      </View>
      <FlatList
        data={records?.filter(
          data =>
            data.name
              .toLowerCase()
              .includes(searchQuery.toLowerCase().trim()) ||
            data.link
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase().trim()) ||
            data.userIdentifier
              .toLowerCase()
              .includes(searchQuery.toLowerCase().trim()),
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        keyExtractor={(item, index) => item.name + item.userIdentifier + index}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigate(ROUTES.RECORD_DETAILS, {record: item})}
            style={styles.row}>
            <View style={styles.rowImg}>
              <AntDesign name="android1" size={24} color={COLORS.greyDark} />
            </View>
            <View>
              <Text style={styles.passwordTitle}>{item.name}</Text>
              <Text style={styles.passwordIdentifier}>
                {item.userIdentifier}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => copyToClipboard(item.password)}
              style={styles.copyIconContainer}>
              <Ionicons name="copy-outline" size={24} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </Screen>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchInputContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: COLORS.greyLight,
    minHeight: 45,
    marginBottom: 24,
  },
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
