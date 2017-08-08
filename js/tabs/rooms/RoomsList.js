// @flow
'use strict';

import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
} from 'react-native';

export default class RoomsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRooms: null
        }
    }

    render() {
        return (
        <View style={styles.container}>
            <FlatList data={[{key: 'demo1'}, {key: 'demo2'}]} renderItem={({item}) => <Text>{item.key}</Text>} />
        </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});