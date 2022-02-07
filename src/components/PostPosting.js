import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions , TextInput} from 'react-native'
import CarouselCards from './carousalWork/CarousalCard'
import LeftAngle from 'react-native-vector-icons/Entypo'


const styles = StyleSheet.create({
    mainContainer: {
        height: Dimensions.get('window').height,
    },
    HeaderMainDiv: {
        width: Dimensions.get('window').width,
        height: '10%',
        backgroundColor: '#dd9392',
        flexDirection: 'row',
        alignItems: 'center',
        height: 70,
        justifyContent: 'space-between',
        paddingLeft:5
    },
    postText: {
        fontFamily: 'Canaro-LightDEMO',
        fontWeight: '300',
        fontSize: 24,
        color: '#fff',
        marginLeft: 10
    },
    nxtText: {
        fontFamily: 'Canaro-LightDEMO',
        fontWeight: '300',
        fontSize: 17,
        color: '#fff',
        marginRight: 10
    },
    textAreaContainer: {
        borderColor: 'grey',
        padding: 5
      },
      textArea: {
        height: 90,
        justifyContent: "flex-start",
        backgroundColor:'#f1f4f5',
        textAlignVertical: 'top'
      },
      descriptionTxt:{
        fontFamily:'Canaro-LightDEMO',
        fontWeight:'300',
        fontSize:16,
        color:"#030303",
        margin:5,
        marginTop:25
      },
      tagTxt:{
        fontFamily:'Canaro-LightDEMO',
        fontWeight:'300',
        fontSize:16,
        color:"#030303",
        marginLeft:5
      },
      tagMainDiv:{
        flexDirection:'row',
        width:Dimensions.get('window').width,
        justifyContent:'space-between'
      },
})

const PostCreating2 = ({ navigation }) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.HeaderMainDiv}>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <TouchableOpacity onPress={()=> navigation.goBack()}>
                        <Text>
                            <LeftAngle name='chevron-small-left' color='white' size={30} />
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <View >
                        <Text style={styles.postText}>
                            Post Creating
                        </Text>
                    </View>
                </View>
                <View >
                    <TouchableOpacity onPress={() => navigation.navigate("PostCreating2")}>
                        <Text style={styles.nxtText}>
                            Post
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ height: '40%' }}>
                <CarouselCards />
            </View>
            <View style={{height:'40%'}}>
                <Text style={styles.descriptionTxt} >Add description</Text>
                <View style={styles.textAreaContainer} >
                    <TextInput
                        style={styles.textArea}
                        underlineColorAndroid="transparent"
                        placeholder="write here.."
                        placeholderTextColor="grey"
                        numberOfLines={5}
                        multiline={true}
                    />
                </View>
                <View style={styles.tagMainDiv}>
                    <Text style={styles.tagTxt}>Tag People</Text>
                    <Text>
                    <LeftAngle name='chevron-small-right' color='black' size={30} />
                    </Text>
                </View>
                <View style={styles.tagMainDiv}>
                    <Text style={styles.tagTxt}>Share with</Text>
                    <Text>
                    <LeftAngle name='chevron-small-right' color='black' size={30} />
                    </Text>
                </View>
            </View>
           
        </View>
    )
}

export default PostCreating2

