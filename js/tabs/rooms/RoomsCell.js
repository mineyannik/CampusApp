import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { bigFont, smallFont, listViewRowPaddingHorizontal } from '../../util/Constants';
import Colors from '../../util/Colors';
import ListCellTouchable from '../../util/ListCellTouchable';

export default class RoomsCell extends Component {
    render() {
        return(
            <ListCellTouchable onPress={this.props.onPress} underlayColor={Colors.cellBorder} style={styles.element}>
                <View>
                    <Text style={styles.heading}>{this.props.heading}</Text>
                    <Text style={styles.subHeading}>{this.props.subHeading}</Text>
                </View>
            </ListCellTouchable>
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