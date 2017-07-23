// @flow
'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { feeds } from '../../util/Constants';

export default class NewsSettings extends Component {
    constructor(props) {
    super(props);
    this._renderScreenContent = this._renderScreenContent.bind(this);
  }
  
    render() {
        return(
            <View style={styles.container}>
                {this._renderScreenContent()}
            </View>
    );
  }

  _renderScreenContent() {
    return(
        feeds.map((feed, key) =>
            <Text key={key}>{feed.name}</Text>
        )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
