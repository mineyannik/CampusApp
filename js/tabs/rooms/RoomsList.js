// @flow
'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
} from 'react-native';
import RoomsCell from './RoomsCell';


export default class RoomsList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this._prepareData()}
                    renderItem={({item}) => <RoomsCell onPress={() => this.props.onSelectRoom(item)} heading={item['Begriff 1']} subHeading={item['Raum']}/>}
                />
            </View>
        );
    }


    _prepareData() {
        if(this.props.searchResults) {
            return this._addUniqueKeys(this.props.searchResults);
        } else {
            return this._addUniqueKeys(this.props.completeList);
        }
    }

    _addUniqueKeys(inputArray) {
        return inputArray.map((val, index) => {
            let tmp = val;
            tmp.key = index;
            return tmp;
        });
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});