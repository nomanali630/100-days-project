import React from 'react'
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'




export const SLIDER_WIDTH = Dimensions.get('window').width
// export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)
export const ITEM_WIDTH = Dimensions.get('window').width
// export const ITEM_Height = Dimensions.get('window').height 

const CarouselCardItem = ({ item, index }) => {
    return (
        <View style={styles.container} key={index}>
            <View >

                <Image
                    source={item.imgUrl}
                    style={styles.image}
                />
            </View>
            {/* <Text style={styles.header}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text> */}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'pink',
        borderRadius: 8,
        width: SLIDER_WIDTH,
        height: 500,
        marginTop:18
        // paddingBottom: 40,
        // shadowColor: "#000",
        // shadowOffset: {
        //   width: 0,
        //   height: 3,
        // },
        // shadowOpacity: 0.29,
        // shadowRadius: 4.65,
        // elevation: 7,
    },
      image: {
        width: ITEM_WIDTH ,
        // position:'absolute',
        borderRadius: 15,
        height: 340,

      },
    //   header: {
    //     color: "#222",
    //     fontSize: 28,
    //     fontWeight: "bold",
    //     paddingLeft: 20,
    //     paddingTop: 20
    //   },
    //   body: {
    //     color: "#222",
    //     fontSize: 18,
    //     paddingLeft: 20,
    //     paddingLeft: 20,
    //     paddingRight: 20
    //   }
})

export default CarouselCardItem