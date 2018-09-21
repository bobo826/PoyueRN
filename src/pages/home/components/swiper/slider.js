import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image
  } from 'react-native';
import { Carousel, WingBlank } from 'antd-mobile-rn';
const slide1 = require('./ad1.jpg')
const slide2 = require('./ad2.jpg')
const slide3 = slide1

export default class Slider extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            data: [slide1,slide2,slide3],
            imgHeight:164
        }
    }
    
    
    componentDidMount() {
    // simulate img loading
    setTimeout(() => {
            this.setState({
                data: [slide1,slide2,slide3],
            });
        }, 100);
    }
    render() {
        return (
            <Carousel
                autoplay={true}
                infinite
                autoplayInterval={4000}
            >
                {this.state.data.map(val => (
                    <View
                        key={val}
                        style={{width:"100%",height:this.state.imgHeight,justifyContent: 'center',alignItems: 'center'}}
                    >
                        <Image 
                            source={val}
                            resizeMethod='scale'
                            resizeMode = 'cover'
                        />
                    </View>
                ))}
            </Carousel>
        );
    }
}
