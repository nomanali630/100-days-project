import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useQuery} from '@apollo/client';
import {FriendSuggestion} from '../../@graphql/Query/friendsQuery';
import ContactHeader from '../../components/Headers/Contact';
import NoData from '../../components/NoData';
import SelectScreen from '../../components/SelectScreen';
import FriendSuggestionHorizontal from '../../components/FriendSuggestionScreens/FriendSuggestionHorizontal';
import FriendSuggestionvartical from '../../components/FriendSuggestionScreens/FriendSuggestionvartical';
import {withFriendContext} from '../../Context/FriendsContext';

const styles = StyleSheet.create({
  frndSuggestText: {
    fontFamily: 'Canaro-LightDEMO',
    fontWeight: '300',
    fontSize: 18,
    color: '#030303',
    opacity: 0.4,
    paddingLeft: 10,
  },
  suggestionContainer: {
    flexDirection: 'row',
  },
  frndRequestText: {
    fontFamily: 'Canaro-LightDEMO',
    fontWeight: '300',
    fontSize: 13,
    // paddingLeft: ,
    paddingHorizontal: 10,
    color: 'white',
  },
});

const Contacts = ({navigation, GetUserInfo}) => {
  const headerName = 'Friends';
  const {
    loading,
    error,
    data: FriendSuggestionData,
    refetch: refetchFriendSuggestion,
  } = useQuery(FriendSuggestion);

  useEffect(() => {
    if (!FriendSuggestionData) {
      refetchFriendSuggestion();
    }
  }, []);

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

  return (
    <View
      style={
        orientation === 'PORTRAIT'
          ? {
              width: screenWidth,
              height: screenHeight,
              backgroundColor: '#f9f9f9',
            }
          : {
              width: screenWidth,
              height: screenHeight,
              backgroundColor: '#f9f9f9',
            }
      }>
      <ContactHeader navigation={navigation} headerName={headerName} />

      <View
        style={orientation === 'PORTRAIT' ? {height: '82%'} : {height: '82%'}}>
        <ScrollView
          contentContainerStyle={
            orientation === 'PORTRAIT' ? {width: '100%', height: '100%'} : null
          }>
          <SelectScreen navigation={navigation} />

          <View
            style={
              orientation === 'PORTRAIT'
                ? {height: '8%', justifyContent: 'center'}
                : null
            }>
            <TouchableOpacity
              onPress={() => navigation.navigate('AcceptAndDecline')}
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  backgroundColor: '#efa4a3',
                  // width: 220,
                  height: 28,
                  justifyContent: 'center',
                  borderRadius: 50,
                  marginBottom: 10,
                }}>
                <Text style={styles.frndRequestText}>Show Friends Request</Text>
              </View>
            </TouchableOpacity>

            <Text style={styles.frndSuggestText}>Friend suggestion</Text>
          </View>
          <View
            style={{
              ...styles.suggestionContainer,
              width: screenWidth,
              height: '30%',
            }}>
            <ScrollView horizontal={true}>
              {FriendSuggestionData?.FriendSuggestion.length >= 1 ? (
                FriendSuggestionData?.FriendSuggestion.map((v, i) => {
                  return (
                    <FriendSuggestionHorizontal
                      v={v}
                      key={i}
                      i={i}
                      onPress={() => GetUserInfo(v.id)}
                    />
                  );
                })
              ) : (
                <NoData Content={'No Friend Suggestion to Show'} />
              )}
            </ScrollView>
          </View>
          <View
            style={
              orientation === 'PORTRAIT'
                ? {height: '8%', justifyContent: 'center'}
                : null
            }>
            <Text style={styles.frndSuggestText}>Friends Through contact</Text>
          </View>
          <View
            style={
              orientation === 'PORTRAIT'
                ? {width: '100%', height: '40%'}
                : {width: '100%', height: '39%'}
            }>
            <ScrollView nestedScrollEnabled={true}>
              {FriendSuggestionData?.FriendSuggestion ? (
                FriendSuggestionData?.FriendSuggestion.map((data, i) => {
                  return (
                    <FriendSuggestionvartical
                      SuggestionData={data}
                      key={i}
                      i={i}
                      refetchFriendSuggestion={refetchFriendSuggestion}
                    />
                  );
                })
              ) : (
                <NoData Content={'No Friend Suggestion to Show'} />
              )}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default withFriendContext(Contacts);
