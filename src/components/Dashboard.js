import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import paw1 from '../assets/paw-print.png';
import paw2 from '../assets/paw-print2.png';
import paw3 from '../assets/paw-print3.png';
import {withContext} from '../Context/appContext';
import ContactHeader from './Headers/Contact';
import SelectScreen from './SelectScreen';

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#f9f9f9',
    width: Dimensions.get('window').width,
    height: '80%',
    alignItems: 'center',
  },
  miniContainer: {
    width: '90%',
    height: '30%',
    marginTop: '8%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divContainer: {
    backgroundColor: '#fff',
    width: '46%',
    height: '100%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tierDiv: {
    backgroundColor: '#08f6e7',
    borderRadius: 100,
    width: 45,
    height: 45,
  },
  tierNumber: {
    fontFamily: 'garmond',
    fontWeight: 'bold',
    fontSize: 36,
    color: '#fff',
  },
  Text: {
    color: '#63697b',
    fontFamily: 'garmond',
    fontWeight: 'normal',
    fontSize: 16,
  },
  currentDayDiv: {
    width: 45,
    height: 45,
  },
  currentdayNumber: {
    fontFamily: 'garmond',
    fontWeight: 'bold',
    fontSize: 36,
    color: '#030303',
  },
  missingDayDiv: {
    width: 45,
    height: 45,
  },
  missingdayNumber: {
    fontFamily: 'garmond',
    fontWeight: 'bold',
    fontSize: 36,
    color: '#030303',
  },
  iconsDiv: {
    width: 101.8,
    marginTop: 10,
    height: 24,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  RefDiv: {
    width: 45,
    height: 45,
    flexDirection: 'row',
  },
  reftext: {
    fontFamily: 'garmond',
    fontWeight: 'bold',
    fontSize: 36,
    color: '#030303',
  },
  refNumber: {
    fontFamily: 'garmond',
    fontWeight: 'bold',
    fontSize: 22,
    color: '#030303',
  },
});
// working on this component (uncompleted)
const Dashboard = ({navigation, currentUser}) => {
  console.log('dashboard wala log ,', currentUser?.loggedInUser?.CurrentDay);
  console.log('dashboard wala log ,', currentUser?.loggedInUser?.Tier?.Tier);

  return (
    <>
      <ContactHeader headerName={'khan'} />
      <View>
        <SelectScreen />
      </View>
      <View style={styles.Container}>
        <View style={styles.miniContainer}>
          <View style={styles.divContainer}>
            <View style={styles.tierDiv}>
              <Text style={styles.tierNumber}>28</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.Text}>Current </Text>
              <Text style={styles.Text}>Tier</Text>
            </View>
          </View>
          <View style={styles.divContainer}>
            <View style={styles.currentDayDiv}>
              <Text style={styles.currentdayNumber}>27</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.Text}>Current </Text>
              <Text style={styles.Text}>Day</Text>
            </View>
          </View>
        </View>
        <View style={styles.miniContainer}>
          <View style={styles.divContainer}>
            <View style={styles.missingDayDiv}>
              <Text style={styles.missingdayNumber}>03</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.Text}>Missing</Text>
              <Text style={styles.Text}>days</Text>
            </View>
            <View style={styles.iconsDiv}>
              <Image source={paw3} resizeMode="contain" />
              <Image source={paw2} resizeMode="contain" />
              <Image source={paw1} resizeMode="contain" />
            </View>
          </View>
          <View style={styles.divContainer}>
            <View style={styles.RefDiv}>
              <Text style={styles.reftext}>R</Text>
              <Text style={styles.refNumber}>2</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.Text}>rest and</Text>
              <Text style={styles.Text}>reflection days</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default withContext(Dashboard);
