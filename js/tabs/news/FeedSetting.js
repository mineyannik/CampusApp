// @flow
'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Switch
} from 'react-native';
import Constants from '../../util/Constants.js';
import Colors from '../../util/Colors.js';

export default class FeedSetting extends Component {
    render() {
      return(
        <View style={styles.container}>
          <Text style={this.props.subbed ? styles.textActive : styles.textNotActive}>{this.props.feed.name}</Text>
          <Switch onValueChange={this.props.onPress} value={this.props.subbed}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Constants.listViewRowPaddingVertical,
    borderColor: Colors.cellBorder,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textActive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dhbwRed
  },
  textNotActive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.lightText
  }
});
