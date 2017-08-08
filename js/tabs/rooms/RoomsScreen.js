// @flow
'use strict';

import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import CampusHeader from '../../util/CampusHeader';
import RoomsList from './RoomsList';
import {doInitialParseOfCsvData, runSearch} from './redux';

function selectPropsFromStore(store) {
  return {
    isLoading: store.rooms.isLoading,
    searchresults: store.rooms.searchresults,
    completeList: store.rooms.completeList,
  };
}

export class RoomsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: ''
        }
    }

    componentWillMount() {
        // Parse Csv Data into JS-Object once
        if(!this.props.completeList) {
            this.props.dispatch(doInitialParseOfCsvData());
        }
        console.log(this.props.completeList);
    }

    render() {
        return (
        <View style={styles.container}>
            <CampusHeader title='Räume' style={styles.header}/>
            <TextInput
                placeholder='Raumsuche'
                value={this.state.searchString}
                onChange={this._doSearch.bind(this)}
                underlineColorAndroid='transparent'
                style={styles.searchBox} />
            <RoomsList
                isLoading={this.props.isLoading}
                searchResults={this.props.searchResults}
                completeList={this.props.completeList} />
        </View>
        )
    }

    _doSearch(event) {
        const searchString = event.nativeEvent.text;
        this.setState({searchString: searchString});
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
    paddingLeft: 30,
    fontSize: 18,
    height: 10,
    flex: .1,
    borderWidth: 9,
    borderColor: '#E4E4E4',
  }
});

export default connect(selectPropsFromStore)(RoomsScreen);