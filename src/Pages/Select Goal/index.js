import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {useQuery, useMutation} from '@apollo/client';
import {getAllGoals} from '../../@graphql/Query/query';
import {SelectedGoal} from '../../@graphql/mutations/mutation';
import {showMessage} from 'react-native-flash-message';
import {withContext} from '../../Context/appContext';
import NoData from '../../components/NoData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader/Loader';

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
  },
  contentContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    height: 116,
  },
  contentContainerBorder: {
    borderColor: 'pink',
    borderWidth: 2,
  },
  head: {
    fontSize: 30,
    marginTop: 30,
    fontFamily: 'Canaro-LightDEMO',
    fontSize: 29,
    color: '#010101',
  },
  picture: {
    width: '100%',
    height: 113,
    borderRadius: 10,
  },
  contentText: {
    fontFamily: 'Canaro-LightDEMO',
    fontSize: 20,
    color: '#0a0a0a',
    marginLeft: 25,
    width: '70%',
  },
  buttonContainer: {
    backgroundColor: '#DD9392',
    width: 250,
    height: 70,
    justifyContent: 'center',
    borderRadius: 50,
  },
  buttonContainerDisabled: {
    backgroundColor: 'grey',
    width: 250,
    height: 70,
    justifyContent: 'center',
    borderRadius: 50,
  },
  button: {
    fontFamily: 'Garamond',
    fontSize: 28,
    textAlign: 'center',
    color: 'white',
  },
});

const SelectGoal = ({refetchCurrentUser}) => {
  const [loader, setLoader] = useState(false);
  const [active, setActive] = useState(null);
  const [goalSelected, setGoalSelected] = useState('');

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

  const {loading, error, data, refetch} = useQuery(getAllGoals);
  useEffect(() => {
    if (!data) {
      refetch();
    }
  }, []);

  const [selectGoal] = useMutation(SelectedGoal, {
    onCompleted: res => {
      console.log(res);
      setLoader(false);
      showMessage({
        message: res.selectGoal.message,
        type: 'success',
      });
      refetchCurrentUser();
    },
    onError: ({message}) => {
      setLoader(false);
      console.log(message);
      showMessage({
        message: message,
        type: 'danger',
      });
    },
  });
  const handleGoal = e => {
    setLoader(true);
    selectGoal({
      variables: {
        Goal: goalSelected,
      },
    });
  };

  const ActiveDiv = value => {
    setActive(value.id);
    setGoalSelected(value.Goal);
  };

  return (
    <View>
      <View>
        {orientation === 'PORTRAIT' ? (
          <View
            style={
              orientation === 'PORTRAIT'
                ? {
                    ...styles.mainContainer,
                    width: screenWidth,
                    height: screenHeight,
                  }
                : {
                    ...styles.mainContainer,
                    width: screenWidth,
                    height: screenHeight,
                  }
            }>
            <View
              style={
                orientation === 'PORTRAIT'
                  ? {height: '15%', justifyContent: 'center'}
                  : null
              }>
              <Text style={styles.head}>Choose your Goal</Text>
            </View>

            <View
              style={{
                height: '70%',
                alignItems: 'center',
                width: '96%',
              }}>
              {loader ? <Loader /> : null}
              <ScrollView
                contentContainerStyle={{width: '100%', paddingBottom: 10}}
                nestedScrollEnabled={true}>
                {data?.Goal.length >= 1 ? (
                  data?.Goal.map((value, index) => {
                    const img = value?.Image?.filename;
                    return (
                      <TouchableWithoutFeedback
                        key={index}
                        onPress={() => ActiveDiv(value)}>
                        <View
                          style={
                            active === value.id
                              ? {
                                  ...styles.contentContainer,
                                  ...styles.contentContainerBorder,
                                }
                              : {...styles.contentContainer}
                          }>
                          <Text style={styles.contentText}>{value.Goal}</Text>
                          <View style={{width: '30%', height: '100%'}}>
                            <Image source={{uri: img}} style={styles.picture} />
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    );
                  })
                ) : (
                  <NoData Content={'No Goals to Show'} />
                )}
              </ScrollView>
            </View>

            <View style={{marginTop: 20, height: '10%'}}>
              {active === null ? (
                <TouchableOpacity style={styles.buttonContainerDisabled}>
                  <Text
                    style={styles.button}
                    onPress={() =>
                      showMessage({
                        message: 'please select the goal',
                        type: 'danger',
                      })
                    }>
                    Next
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.buttonContainer}>
                  <Text style={styles.button} onPress={handleGoal}>
                    Next
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ) : (
          <View
            style={
              orientation === 'PORTRAIT'
                ? {
                    ...styles.mainContainer,
                    width: screenWidth,
                    height: screenHeight,
                  }
                : {
                    ...styles.mainContainer,
                    width: screenWidth,
                    height: screenHeight,
                  }
            }>
            <ScrollView contentContainerStyle={{alignItems: 'center'}}>
              <View
                style={
                  orientation === 'PORTRAIT'
                    ? {height: '15%', justifyContent: 'center'}
                    : {height: '8%', justifyContent: 'center'}
                }>
                <Text style={styles.head}>Choose your Goal</Text>
              </View>

              <View
                style={{
                  height: '70%',
                  alignItems: 'center',
                  width: '96%',
                }}>
                <ScrollView
                  contentContainerStyle={{width: '100%', paddingBottom: 10}}
                  nestedScrollEnabled={true}>
                  {data.Goal.length >= 1 ? (
                    data.Goal.map((value, index) => {
                      const img = value?.Image?.filename;
                      return (
                        <TouchableWithoutFeedback
                          key={index}
                          onPress={() => ActiveDiv(value)}>
                          <View
                            style={
                              active === value.id
                                ? {
                                    ...styles.contentContainer,
                                    ...styles.contentContainerBorder,
                                  }
                                : {...styles.contentContainer}
                            }>
                            <Text style={styles.contentText}>{value.Goal}</Text>
                            <View style={{width: '30%', height: '100%'}}>
                              <Image
                                source={{uri: img}}
                                style={styles.picture}
                              />
                            </View>
                          </View>
                        </TouchableWithoutFeedback>
                      );
                    })
                  ) : (
                    <NoData Content={'No Goals to Show'} />
                  )}
                </ScrollView>
              </View>

              <View style={{marginTop: 20, height: '10%'}}>
                {active === null ? (
                  <TouchableOpacity style={styles.buttonContainerDisabled}>
                    <Text
                      style={styles.button}
                      onPress={() => alert('please select your goal')}>
                      Next
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.button} onPress={handleGoal}>
                      Next
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

export default withContext(SelectGoal);
