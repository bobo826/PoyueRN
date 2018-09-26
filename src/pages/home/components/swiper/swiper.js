import React from 'react'
import {
  View,
  StyleSheet,
  Image
} from 'react-native'
import Swiper from 'react-native-swiper'
const slide1 = require('./ad1.jpg')
const slide2 = require('./ad2.jpg')
const slide3 = slide1
export default () => 
    <Swiper style={styles.wrapper} autoplay={false}>
        <View style={styles.slide}>
            <Image source={slide1}/>
        </View>
        <View style={styles.slide}>
            <Image source={slide2}/>
        </View>
        <View style={styles.slide}>
            <Image source={slide3}/>
        </View>
    </Swiper>
const styles = StyleSheet.create({
    wrapper: { 
        height:100, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide: {
        backgroundColor:'red',
        justifyContent: 'center',
        alignItems: 'center',
    }
  });