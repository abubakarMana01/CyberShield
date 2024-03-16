import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Screen} from '../components';
import {useNavigate} from '../hooks';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useRoute} from '@react-navigation/native';

type Route = {params: {variant: 'update' | 'create'}};

const UpdateRecord = () => {
  const navigation = useNavigate();
  const {params} = useRoute() as Route;

  if (!params.variant) {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerLeft} onPress={navigation.goBack}>
          <FontAwesome6 name="arrow-left-long" size={22} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {params.variant === 'update' ? 'Update' : 'New'} record
        </Text>
      </View>

      <Screen>
        <View></View>
      </Screen>
    </View>
  );
};

export default UpdateRecord;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 55,
    justifyContent: 'center',
  },
  headerTitle: {
    fontWeight: '500',
    fontSize: 17,
  },
  headerLeft: {
    position: 'absolute',
    left: 16,
  },
});
