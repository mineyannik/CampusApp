// @flow
'use strict';

import React, { Component } from 'react';
import {
  BackAndroid,
  DrawerLayoutAndroid,
}
from 'react-native';

export default class CampusDrawerLayout extends Component {
  _drawer: ?DrawerLayoutAndroid;

  constructor(props: any) {
    super(props);

    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.onDrawerOpen = this.onDrawerOpen.bind(this);
    this.onDrawerClose = this.onDrawerClose.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  render() {
    return (
      <DrawerLayoutAndroid
        ref={(drawer) => this._drawer = drawer}
        {...this.props}
        onDrawerOpen={this.onDrawerOpen}
        onDrawerClose={this.onDrawerClose}
      />
    );
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
    this._drawer = null;
  }

  handleBackButton(): boolean {
    this.closeDrawer();
    return true;
  }

  onDrawerOpen() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  onDrawerClose() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  closeDrawer() {
    this._drawer && this._drawer.closeDrawer();
  }

  openDrawer() {
    this._drawer && this._drawer.openDrawer();
  }
}