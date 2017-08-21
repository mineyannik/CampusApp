// @flow
'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Platform,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import CampusHeader from '../../util/CampusHeader';
import RoomsList from './RoomsList';
import RoomDetails from './RoomDetails';
import {listViewRowPaddingHorizontal} from '../../util/Constants';
import {doInitialParseOfCsvData, runSearch, selectRoom, unselectRoom} from './redux';

function selectPropsFromStore(store) {
  return {
    isLoading: store.rooms.isLoading,
    searchResults: store.rooms.searchResults,
    completeList: store.rooms.completeList,
    selectedRoom: store.rooms.selectedRoom
  };
}

export class RoomsScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // Parse Csv Data into JS-Object once
        if(!this.props.completeList) {
            this.props.dispatch(doInitialParseOfCsvData());
        }
    }
    _setHeader() {
        const leftActionItem = {
            title: 'Back',
            icon: require('../../img/arrow-back.png'),
            onPress: this._onBackPress.bind(this),
          };
          if(this.props.selectedRoom) {
              return(<CampusHeader title='Räume' leftActionItem={leftActionItem} style={styles.header}></CampusHeader>);
          } else {
              return(<CampusHeader title='Räume' style={styles.header}></CampusHeader>);
          }
    }
    render() {
        if((!this.props.isLoading) && this.props.completeList) {
            if(!this.props.selectedRoom) {
                return (
                    <View style={styles.container}>
                        {this._setHeader()}
                        <TextInput
                            placeholder='Raumsuche'
                            onChange={this._doSearch.bind(this)}
                            underlineColorAndroid='transparent'
                            style={styles.searchBox} />
                        <RoomsList
                            searchResults={this.props.searchResults}
                            completeList={this.props.completeList}
                            selectedRoom={this.props.selectedRoom}
                            dispatch={this.props.dispatch} 
                            onSelectRoom={this._viewRoomDetails.bind(this)}
                            style={styles.list} />
                    </View>
                );
            } else {  
                return (
                    <View style={styles.container}>
                        {this._setHeader()}
                        <RoomDetails room={this.props.selectedRoom}></RoomDetails>
                    </View>
                );
            }
        } else {
            return (
                <View style={styles.container}>
                    {this._setHeader()}
                    <ActivityIndicator animating={true} style={styles.center}></ActivityIndicator>
                </View>
            );
        }
    }

    _viewRoomDetails(room) {
        if(Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this._onBackPress.bind(this));
        }
        this.props.dispatch(selectRoom(room));
    }

    _onBackPress() {
        if(this.props.selectedRoom !== null) {
            if(Platform.OS === 'android'){
                BackHandler.removeEventListener('hardwareBackPress', this._onBackPress);
            }
            this.props.dispatch(unselectRoom());
            return true;
        }
        return false;
    }

    _doSearch(event) {
        const searchString = event.nativeEvent.text;
        this.props.dispatch(runSearch(searchString));
    }
}

const styles = StyleSheet.create({
  header: {
    elevation: 0, // disable shadow below header to avoid border above pager tabs
  },
  container: {
    flex: 1,
  },
  searchBox: {
    flex: .1,
    borderBottomColor: "#CCC",
    borderBottomWidth: 2,
    paddingHorizontal: listViewRowPaddingHorizontal,
  },
  list: {
      flex: 1
  },
  center: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default connect(selectPropsFromStore)(RoomsScreen);