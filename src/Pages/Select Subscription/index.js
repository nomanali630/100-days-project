import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import exercisePic from '../../assets/subExercise.png';
import path from '../../assets/path.png';
import TickSvg from '../../components/SVG/TickSvg';
import {useMutation, useQuery} from '@apollo/client';
import {subscribeSubriptionMutation} from '../../@graphql/mutations/mutation';

import {showMessage} from 'react-native-flash-message';
import {withContext} from '../../Context/appContext';
import NoData from '../../components/NoData';

const styles = StyleSheet.create({
  Maincontainer: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextDiv: {
    fontFamily: 'Canaro-LightDEMO',
    fontWeight: '300',
    fontSize: 28,
    color: '#000',
    height: 35,
  },
  subDiv: {
    width: '100%',
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#ee8c8b',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subDiv2: {
    width: '100%',
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  breakPath: {
    alignSelf: 'flex-end',
  },
  circleDiv: {
    width: 24,
    height: 24,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#707070',
    borderRadius: 50,
    marginLeft: 10,
  },
  buttonContainer: {
    backgroundColor: '#DD9392',
    width: '100%',
    height: 70,
    justifyContent: 'center',
    borderRadius: 50,
  },
  button: {
    fontFamily: 'Garamond',
    fontSize: 28,
    textAlign: 'center',
    color: '#fff',
  },
  Txt: {
    fontFamily: 'Canaro-LightDEMO',
    fontWeight: '300',
    fontSize: 18,
    color: '#000',
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 17,
  },
  container: {
    height: Dimensions.get('window').height,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

const SelectSubscription = ({
  navigation,
  UserHasSubscribed,
  AllAvailableSubscriptions,
  refetchUserSubscribed,
  refetchCurrentUser,
  ...props
}) => {
  const [active, setActive] = useState(null);
  const [loader, setLoader] = useState(false);
  const [PkgName, setPkgName] = useState('');

  const [screenWidth, setscreenWidth] = useState(
    Dimensions.get('window').width,
  );
  const [screenHeight, setscreenHeight] = useState(
    Dimensions.get('window').height,
  );
  const [orientation, setOrientation] = useState('PORTRAIT');

  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        setOrientation('PORTRAIT');
      } else {
        setOrientation('LANDSCAPE');
      }
    });
  }, []);

  useEffect(() => {
    setscreenWidth(Dimensions.get('window').width);
    setscreenHeight(Dimensions.get('window').height);
  }, [orientation]);

  const ActiveDiv = v => {
    setActive(v.id);
    setPkgName(v.PackageName);
  };

  const [Subscription] = useMutation(subscribeSubriptionMutation, {
    onCompleted: res => {
      console.log(res);
      setLoader(false);
      showMessage({
        message: res.subscribeSubscription.message,
        type: 'success',
      });
      refetchCurrentUser();
    },
    onError: ({message}) => {
      console.log(message);
      setLoader(false);
      showMessage({
        message: message,
        type: 'danger',
      });
    },
  });

  const handleSubscription = e => {
    if (active) {
      setLoader(true);
      Subscription({
        variables: {
          PackageName: PkgName,
          BankName: 'hbl',
        },
      });
    } else {
      showMessage({
        message: 'Please select the package',
        type: 'danger',
      });
    }
  };

  return (
    <View>
      {loader === true ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View
          style={
            orientation === 'PORTRAIT'
              ? {
                  ...styles.Maincontainer,
                  width: screenWidth,
                  height: screenHeight,
                }
              : {
                  ...styles.Maincontainer,
                  width: screenWidth,
                  height: screenHeight,
                }
          }>
          <View
            style={
              orientation === 'PORTRAIT'
                ? {
                    width: '92%',
                    height: '100%',
                  }
                : {
                    width: '95%',
                  }
            }>
            <View
              style={
                orientation === 'PORTRAIT'
                  ? {
                      width: '100%',
                      marginTop: '20%',
                      height: '20%',
                      justifyContent: 'center',
                    }
                  : {
                      width: '100%',
                      marginTop: '5%',
                      justifyContent: 'center',
                    }
              }>
              <Text style={styles.TextDiv}>Unlock</Text>
              <Text style={styles.TextDiv}>unlimited access</Text>
              <Text style={styles.TextDiv}>Subscribe</Text>
            </View>
            <View style={{height: '80%', width: '100%'}}>
              <View style={{height: '35%'}}>
                <Image source={exercisePic} style={styles.img} />
              </View>

              <ScrollView
                style={{height: '40%'}}
                contentContainerStyle={{
                  marginTop: 15,
                  paddingBottom: 100,
                }}>
                {AllAvailableSubscriptions?.AvailableSubscriptions &&
                AllAvailableSubscriptions?.AvailableSubscriptions.length >=
                  1 ? (
                  AllAvailableSubscriptions?.AvailableSubscriptions.map(v => {
                    return (
                      <TouchableWithoutFeedback
                        style={{width: '100%'}}
                        key={v.id}
                        onPress={() => ActiveDiv(v)}>
                        {active === v.id ? (
                          <View style={styles.subDiv}>
                            <View style={{flexDirection: 'row', width: '60%'}}>
                              <View style={{marginLeft: 10}}>
                                <TickSvg />
                              </View>
                              <View
                                style={{marginLeft: 10, flexDirection: 'row'}}>
                                <Text style={styles.Txt}>
                                  {v.PackageTimePeriod}
                                </Text>
                                <Text style={styles.Txt}> ${v.Charges}</Text>
                              </View>
                            </View>
                            <View style={{width: '40.3%', height: '100%'}}>
                              <Image source={path} style={styles.breakPath} />
                            </View>
                          </View>
                        ) : (
                          <View style={styles.subDiv2}>
                            <View style={styles.circleDiv}></View>
                            <View
                              style={{marginLeft: 10, flexDirection: 'row'}}>
                              <Text style={styles.Txt}>
                                {v.PackageTimePeriod}
                              </Text>
                              <Text style={styles.Txt}> ${v.Charges}</Text>
                            </View>
                          </View>
                        )}
                      </TouchableWithoutFeedback>
                    );
                  })
                ) : (
                  <NoData Content={'No Subscription Packages Available'} />
                )}
                <View style={{marginTop: 15}}>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={handleSubscription}>
                    <Text style={styles.button}>Subscribe</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default withContext(SelectSubscription);
