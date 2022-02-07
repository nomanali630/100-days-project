import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LeftAngle from 'react-native-vector-icons/Entypo';
import CarouselCards from './carousalWork/CarousalCard';
import postSelectedPic from '../assets/postCreatingSelected.png';
import imgProfile2 from '../assets/img2.png';
import imgProfile3 from '../assets/img3.png';
import imgProfile4 from '../assets/img4.png';
import imgProfile5 from '../assets/img5.png';
import imgProfile6 from '../assets/img6.png';
import imgProfile7 from '../assets/img7.png';
const array = [
  postSelectedPic,
  imgProfile2,
  imgProfile3,

  imgProfile4,
  imgProfile5,
  imgProfile6,
  imgProfile7,

  imgProfile2,
  imgProfile3,

  imgProfile4,
  imgProfile5,
  imgProfile6,
  imgProfile7,

  imgProfile2,
  imgProfile3,

  imgProfile4,
  imgProfile5,
  imgProfile6,
  imgProfile7,
];

const styles = StyleSheet.create({
  HeaderMainDiv: {
    width: Dimensions.get('window').width,
    backgroundColor: '#dd9392',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  postText: {
    fontFamily: 'Canaro-LightDEMO',
    fontWeight: '300',
    fontSize: 24,
    color: '#fff',
    marginLeft: 10,
  },
  nxtText: {
    fontFamily: 'Canaro-LightDEMO',
    fontWeight: '300',
    fontSize: 17,
    color: '#fff',
    marginRight: 10,
  },
  cards: {
    width: '33%',
    borderRadius: 10,
    marginTop: 4,
  },
  cardImages: {
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: '#F9F9F9',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 50,

    justifyContent: 'space-between',
  },
});

const PostCreating = ({navigation}) => {
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
          ? {width: screenWidth, height: screenHeight}
          : {width: screenWidth, height: screenHeight}
      }>
      <View
        style={
          orientation === 'PORTRAIT'
            ? {...styles.HeaderMainDiv, height: '10%', width: screenWidth}
            : {...styles.HeaderMainDiv, height: '20%', width: screenWidth}
        }>
        <View style={{flexDirection: 'row'}}>
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text>
                <LeftAngle name="chevron-small-left" color="white" size={30} />
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.postText}>Post Creating</Text>
          </View>
        </View>
        <View>
          {/* onPress={() => navigation.navigate('PostCreating2')} */}
          <TouchableOpacity>
            <Text style={styles.nxtText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={
          orientation === 'PORTRAIT'
            ? {height: '50%', width: '100%'}
            : {height: '50%', width: '100%'}
        }>
        <CarouselCards />
      </View>
      <View
        style={
          orientation === 'PORTRAIT'
            ? {height: '32.5%', width: '100%'}
            : {height: '20.5%', width: '100%'}
        }>
        <ScrollView>
          <View style={styles.cardImages}>
            {array.map(items => (
              <View style={styles.cards}>
                <Image
                  source={items}
                  resizeMode="cover"
                  style={{width: '100%', borderRadius: 10}}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default PostCreating;
