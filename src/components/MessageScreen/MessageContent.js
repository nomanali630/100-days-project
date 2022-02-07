import { Image, StyleSheet, Text, View ,Dimensions} from 'react-native';
import React from 'react';


const styles = StyleSheet.create({
 
    messageMainDiv: {
        width: Dimensions.get('window').width,
        height: 80,
        backgroundColor:'#fff',
        // backgroundColor:'pink',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    messageName: {     
       fontFamily: 'Canaro-LightDEMO',        
        fontWeight: '300',
        fontSize: 16,
        color: '#000',
        marginLeft: 8
    },
    messageTime: {
        fontSize: 12,
        fontFamily: 'garmond',
        fontWeight: 'normal',
        color: '#000',
        opacity: 0.3
    },
    messageContnt: {
        fontSize: 13,
        fontFamily: 'Canaro-LightDEMO',
        color: '#000',
        opacity: 0.4,
        marginLeft: 8
    }


});



const MessageContent = ({navigation , v , i}) => {
  return (
    <View key={i} onPress={() => navigation.navigate()}>
    <View style={styles.messageMainDiv}>
        <View style={{ borderRadius: 100, marginLeft: 10 ,width:'15%',}}>
            <Image source={v.messageProfilePic} style={{ width: 50, height: 50 }} />
        </View>
        <View style={{width:'78%'}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <Text style={styles.messageName}>{v.messengerName}</Text>
                <Text style={styles.messageTime}>{v.messageTime}</Text>
            </View>
            <Text style={styles.messageContnt}>{v.messageContent}</Text>
        </View>
    </View>
</View>
  );
};

export default MessageContent;

