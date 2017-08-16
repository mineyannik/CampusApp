import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { bigFont, smallFont, listViewRowPaddingHorizontal, listViewRowPaddingVertical } from '../../util/Constants';
import Colors from '../../util/Colors';
import ListCellTouchable from '../../util/ListCellTouchable';

export default class RoomsCell extends Component {
    render() {
        return(
            <ListCellTouchable onPress={this.props.onPress} underlayColor={Colors.cellBorder}>
                <View style={styles.element}>
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
        paddingVertical: listViewRowPaddingVertical,
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