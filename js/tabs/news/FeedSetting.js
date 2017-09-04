// @flow
'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Constants from '../../util/Constants.js';
import Colors from '../../util/Colors.js';

export default class FeedSetting extends Component {
    render() {
      const iconSubTrue = <Image style={styles.icon} source={require('./img/icon-sub-true.png')}></Image>;
      const iconSubFalse = <Image style={styles.icon} source={require('./img/icon-sub-false.png')}></Image>;
        return(
            <TouchableOpacity onPress={this.props.onPress} style={styles.container}>
              <View>
                <Text style={this.props.subbed ? styles.textActive : styles.textNotActive}>{this.props.feed.name}</Text>
              </View>
              <View>
                {this.props.subbed ? iconSubTrue : iconSubFalse}
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
  },
  icon: {
    height: 36,
    width: 36
  }
});
