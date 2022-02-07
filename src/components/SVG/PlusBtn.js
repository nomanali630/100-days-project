import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'
import PlusBtn1 from '../../assets/plusBTN.png'

const PlusBtn = () => {
    return (
        <View style={{backgroundColor:'#fff',width:70,height:70,borderRadius:100,alignItems:'center',justifyContent:'center',marginBottom:20}}>
            <Image source={PlusBtn1} style={{width:90,height:90,alignSelf:'center'}}/>
        </View>
    )
}

export default PlusBtn

const styles = StyleSheet.create({})
