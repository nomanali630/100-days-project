import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
    notiMainDiv: {
        width: '100%',
        height: 65,
        borderRadius: 15,
        backgroundColor: '#fff',
    
        flexDirection: 'row',
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
        // marginLeft: 5,
        // marginRight: 10,
      },
      profilePic: {
        width: 40,
        height: 40,
        borderRadius: 100,
      },
      picDiv: {
        // backgroundColor: 'orange',
        width: '18%',
        // height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      nameAndTierDiv: {
        width: '42%',
        // backgroundColor: 'yellow',
        justifyContent: 'center',
        paddingTop:10
      },
      notiActionDiv: {
        // backgroundColor: 'blue',
        width: '35%',
        justifyContent: 'center',
      },
      notiDotDiv: {
        width: '5%',
        // backgroundColor: 'green',
        alignItems: 'flex-start',
        justifyContent: 'center',
      },
      notiDot: {
        height: 12,
        width: 12,
        borderRadius: 100,
        backgroundColor: '#e3b0b1',
      },
      daysTierText: {
        fontSize: 13.5,
        color: '#444d6e',
        fontFamily: 'Canaro-LightDEMO',
        fontWeight: '300',
      },
      TimingMainDiv: {
        backgroundColor: '#fff',
        width: '100%',
        height: 25,
        borderRadius: 15,
      },
      timing: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 10,
        opacity: 0.4,
      },
      timingText: {
        fontSize: 14,
        color: '#444d6e',
        fontFamily: 'garmond',
        fontWeight: 'bold',
      },
      personName: {
        fontFamily: 'Canaro-LightDEMO',
        fontWeight: '300',
        fontSize: 15.5,
        color: '#19295c',
        lineHeight: 30,
      },
      notiAction: {
        fontFamily: 'Canaro-LightDEMO',
        fontWeight: '300',
        fontSize: 13.5,
        color: '#444d6e',
      },
});

const NotificationContent = ({v , i , navigation}) => {
  return (
    <View
      style={{
        width: '95%',
        borderRadius: 15,
        backgroundColor: '#fff',
        marginTop: 10,
        alignSelf: 'center',
      }}
      key={i} onPress={() => navigation.navigate()} >
      <View style={styles.notiMainDiv}>
        <View style={styles.picDiv}>
          <View style={styles.ellipseDiv}>
            <Image source={v.profilePicture} style={styles.profilePic} />
          </View>
        </View>
        <View style={styles.nameAndTierDiv}>
          <Text style={styles.personName}>{v.personName}</Text>
          <Text style={styles.daysTierText}>{v.dayTier}</Text>
        </View>
        <View style={styles.notiActionDiv}>
          <Text style={styles.notiAction}>{v.notiAction}</Text>
        </View>
        <View style={styles.notiDotDiv}>
          <View style={styles.notiDot} />
        </View>
      </View>
      <View style={styles.TimingMainDiv}>
        <View style={styles.timing}>
          <Text style={styles.timingText}>{v.notiTime}</Text>
        </View>
      </View>
    </View>
  );
};

export default NotificationContent;
