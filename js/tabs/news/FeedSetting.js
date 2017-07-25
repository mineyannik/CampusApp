// @flow
'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Constants from '../../util/Constants.js';
import Colors from '../../util/Colors.js';

export default class FeedSetting extends Component {
    render() {
        return(
            <TouchableOpacity onPress={this.props.onPress} style={styles.container}>
              <View>
                <Text>{this.props.feed.name}</Text>
              </View>
              <View>
                <Text>{this.props.subbed ? 'X' : 'O'}</Text>
              </View>
            </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Constants.listViewRowPaddingVertical,
    borderColor: Colors.cellBorder,
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
});
