import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import paw1 from '../../assets/paw-print.png';
import paw2 from '../../assets/paw-print2.png';
import paw3 from '../../assets/paw-print3.png';

const styles = StyleSheet.create({
  contentMainDiv: {
    height: 140,
    alignItems: 'center',
    width: '100%',
    marginTop: 15,
  },
  contentDiv: {
    backgroundColor: '#fff',
    height: 88,
    width: '90%',
    // borderRadius: 10,
    flexDirection: 'row',
    // marginTop: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  ellipseDiv: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#e0a6a7',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  NumBox: {
    width: 34,
    height: 34,
    backgroundColor: '#08f6ef',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  NumText: {
    fontFamily: 'garmond',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
  head: {
    fontFamily: 'Canaro-LightDEMO',
    fontSize: 18,
    fontWeight: '300',
    color: '#19295c',
  },
  paraghaph: {
    // backgroundColor: 'pink',
    height: 30,
    fontWeight: '300',
    fontSize: 12,
    fontFamily: 'Canaro-LightDEMO',
    color: '#7a8fa6',
  },
  buttonContainer: {
    backgroundColor: '#f6a4a3',
    width: 127,
    height: 31,
    justifyContent: 'center',
    borderRadius: 50,
    // marginTop: 8
  },
  button: {
    fontFamily: 'Canaro-LightDEMO',
    fontWeight: '300',
    fontSize: 14,
    textAlign: 'center',
    color: '#fff',
  },
  iconsDiv: {
    width: '30%',
    // marginTop: 10,
    height: 24,
    // display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
});

const FindFriendsContent = ({value, index}) => {
  return (
    <View style={styles.contentMainDiv} key={index}>
      <View style={styles.contentDiv}>
        <View
          style={{
            width: '20%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={styles.ellipseDiv}>
            <Image source={value.displayPic} style={styles.profilePic} />
          </View>
        </View>
        <View style={{width: '60%', justifyContent: 'center'}}>
          <Text style={styles.head}>{value.name}</Text>
          <Text style={styles.paraghaph}>{value.discription}</Text>
        </View>
        <View
          style={{
            width: '20%',
            alignItems: 'center',
            paddingTop: 10,
          }}>
          <View style={styles.NumBox}>
            <Text style={styles.NumText}>{value.tierDay}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          opacity: 0.15,
          borderBottomColor: '#707070',
          width: '80%',
        }}
      />
      <View
        style={{
          backgroundColor: '#fff',
          height: 51,
          width: '90%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          borderBottomRightRadius: 9,
          borderBottomLeftRadius: 9,
        }}>
        <View>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.button}>Follow Friends</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconsDiv}>
          <Image
            source={paw3}
            resizeMode="contain"
            style={{width: 21.6, height: 18.7}}
          />
          <Image
            source={paw2}
            resizeMode="contain"
            style={{width: 21.6, height: 18.7}}
          />
          <Image
            source={paw1}
            resizeMode="contain"
            style={{width: 21.6, height: 18.7}}
          />
        </View>
      </View>
    </View>
  );
};

export default FindFriendsContent;
