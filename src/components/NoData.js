import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Dimensions} from 'react-native';
const NoData = ({Content}) => {
  const windowWidth = Dimensions.get('window').width;
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: windowWidth,
        height: '70%',
      }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '700',
        }}>
        {Content}
      </Text>
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({});
