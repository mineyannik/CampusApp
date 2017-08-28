// @flow
'use strict';

import React, { Component } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import { connect } from 'react-redux';

import NewsCell from './NewsCell';
import NewsDetails from './NewsDetails';
import { fetchNews, subscriptionsChanged, updateFCMSubscriptions } from './redux';
import FeedSetting from './FeedSetting';
import NewsItem from '../../util/types.js';
import CampusHeader from '../../util/CampusHeader';
import ReloadView from '../../util/ReloadView';
import TabbedSwipeView from '../../util/TabbedSwipeView';
import { feeds, listViewRowPaddingHorizontal } from '../../util/Constants';

function selectPropsFromStore(store) {
  return {
    news: store.news.news,
    isFetching: store.news.isFetching,
    networkError: store.news.networkError,
    subscriptions: store.news.subscribedFeeds
  };
}

class NewsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedNewsItem: null,
      chosenSubscriptions: this.props.subscriptions,
      isNotification: false
    };

    this.onFeedSettingChanged = this.onFeedSettingChanged.bind(this);
    this._onBackPress = this._onBackPress.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchNews());
    this.props.dispatch(updateFCMSubscriptions());
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.notificationTopic && !this.state.isNotification) {
      this.setState({
        selectedNewsItem: this.props.news[nextProps.notificationTopic][0],
        isNotification: true
      });
    }
  }

  onNewsItemPressed(newsItem) {
    if(Platform.OS === 'android'){
      BackHandler.addEventListener('hardwareBackPress', this._onBackPress);
    }
    this.setState({ selectedNewsItem: newsItem });
  }

  _onBackPress() {
    if(this.state.selectedNewsItem !== null){
      if(Platform.OS === 'android'){
        BackHandler.removeEventListener('hardwareBackPress', this._onBackPress);
      }
      this.setState({selectedNewsItem: null})
      return true; // Back button handled
    }
    return false;
  }
 
  onFeedSettingChanged(subId) {
    this.setState({
      chosenSubscriptions: this.state.chosenSubscriptions.map(
        (sub, index) => { return index==subId ? !sub : sub }
      )
    });
  }

  onSaveFeedSettings() {
    this.props.dispatch(subscriptionsChanged(this.state.chosenSubscriptions));
    this.props.dispatch(updateFCMSubscriptions());
    this.props.dispatch(fetchNews());
  }

  _getPages(news) {
    const filteredFeeds = feeds.filter((elem) => {
      return this.props.subscriptions[elem.subId]
    });
    
    let pages = filteredFeeds.map(
            (feed) => {
                return {
                    title: feed.name,
                    content: <ScrollView bounces={false}>{this._renderNewsItems(news[feed.key])}</ScrollView>,
                };
            }
        );
    pages.push({
      title: 'Einstellungen',
      content: <ScrollView bounces={false}>{this._renderFeedSettings()}</ScrollView>
    })
    return pages;
  }

  _renderFeedSettings() {
    const feedSettings =
      feeds.map(
        (feed, index) => {
          return (
            <FeedSetting key={index} feed={feed} subbed={this.state.chosenSubscriptions[feed.subId]}
              onPress={() => this.onFeedSettingChanged(feed.subId)}></FeedSetting>
          )
        }
      );

    const btnSave = (<Button key={feeds.length} title='Speichern' onPress={() => this.onSaveFeedSettings()} />);
    
    return(
      <View style={styles.feedSettingsContainer}>
        {feedSettings}
        {btnSave}
      </View>
    );
  }

  _renderNewsItems(news) {
    if(news) {
      return (
        news.map(
          (newsItem, index) =>
            <NewsCell key={'t' + index} news={newsItem}
              onPress={() => this.onNewsItemPressed(newsItem)}/>
        )
      );
    } else {
      return (<View></View>);
    }
    
  }

  _renderScreenContent() {
    const { news, isFetching, networkError } = this.props;

    if(isFetching) {
      return (
        <View style={styles.center}>
          <ActivityIndicator animating={true}/>
        </View>
      );
    }

    const buttonText = 'News laden';
    if(networkError && !news.length) {
      return (
        <ReloadView buttonText={buttonText}
          onPress={() => this.props.dispatch(fetchNews())}/>
      );
    }

    return (
        <TabbedSwipeView pages={this._getPages(news)}/>
    );
  }

  render() {
    if(this.state.selectedNewsItem !== null) {
      return (
        <NewsDetails
          backAction={this._onBackPress.bind(this)}
          news={this.state.selectedNewsItem}/>
      );
    };

    return (
      <View style={styles.container}>
        <CampusHeader title="News" style={styles.header}/>
        {this._renderScreenContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    center: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        elevation: 0
    },
    feedSettingsContainer: {
      paddingHorizontal: listViewRowPaddingHorizontal,
    }
});

export default connect(selectPropsFromStore)(NewsScreen);
