import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { bigFont, smallFont, listViewRowPaddingHorizontal } from '../../util/Constants';
import Colors from '../../util/Colors';

export default class RoomDetails extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <View>
                <Text>{this.props.room["Raum"]}</Text>
                <Text>{this.props.room["Begriff 1"]}</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    element: {
        paddingHorizontal: listViewRowPaddingHorizontal,
        borderColor: Colors.lightGray,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    heading: {
        fontSize: bigFont
    },
    subHeading: {
        fontSize: smallFont
    }
});