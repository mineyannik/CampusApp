// @flow
'use strict';

import fetchNewsData from './helpers';
import { feeds } from '../../util/Constants';
import { fbAccessToken } from '../../../env.js';
import { fetchNewsDataFromFb } from './helpers';
import FCM from 'react-native-fcm';

// ACTIONS
// action that is dispatched whenever the news will we fetched
const REQUEST_NEWS = 'REQUEST_NEWS';

export function requestNews() {
  return {
    type: REQUEST_NEWS
  }
}

// action that is dispatched whenever fetching the news finished
const RECEIVE_NEWS = 'RECEIVE_NEWS';

export function receiveNews(news) {
  return {
    type: RECEIVE_NEWS,
    news: news,
    receivedAt: Date.now()
  }
}

// action that is dispatched whenever an error occurred while fetching the news data
const ERROR_FETCHING_NEWS = 'ERROR_FETCHING_NEWS';

export function errorFetchingNews() {
  return {
    type: ERROR_FETCHING_NEWS,
    news: []
  }
}

export function fetchNews() { // a function as actions (enabled by thunk)
  return async function (dispatch, getState) {
    dispatch(requestNews());
    try {
      let response, responseBody;
      let newsItems = {};
      await Promise.all(feeds.map(async (feed) => {
          if(feed.type == 999) { // 999 = Facebook News Feed
            response = await fetch('https://graph.facebook.com/' + feed.key + '/posts?fields=message,full_picture,caption,description,name,story,created_time,permalink_url&limit=10&access_token=' + fbAccessToken);
            responseBody = await response.json();
            newsItems[feed.key] = fetchNewsDataFromFb(responseBody);
          } else {
            response = await fetch('https://www.dhbw-loerrach.de/index.php?id=' + feed.id + '&type=' + feed.type);
            responseBody = await response.text();
            newsItems[feed.key] = fetchNewsData(responseBody);
          }
      }));
      dispatch(receiveNews(newsItems));
    } catch(e) {
      dispatch(errorFetchingNews());
    }
  }
}

const SUBSCRIPTIONS_CHANGED = 'SUBSCRIPTIONS_CHANGED';

export function subscriptionsChanged(newsubs) {
  return {
    type: SUBSCRIPTIONS_CHANGED,
    subs: newsubs
  }
}

export function updateFCMSubscriptions() {
  return async function(dispatch, getState) {
    const { subscribedFeeds } = getState().news;
    feeds.map((val, index) => {
      if(subscribedFeeds[index]) {
        FCM.subscribeToTopic(val.key);
      } else {
        FCM.unsubscribeFromTopic(val.key);
      }
    });
  }
}

// REDUCER
export function news(state = {
  isFetching: false,
  networkError: false,
  lastUpdated: null,
  subscribedFeeds: [true,true,true,true],
  news: []
}, action) {
  switch (action.type) {
    case REQUEST_NEWS:
      return {...state,
        isFetching: true,
        networkError: false
      };
    case RECEIVE_NEWS:
      return {...state,
        isFetching: false,
        news: action.news,
        networkError: false,
        lastUpdated: action.receivedAt
      };
    case ERROR_FETCHING_NEWS:
      return {...state,
        isFetching: false,
        networkError: true,
      };
    case SUBSCRIPTIONS_CHANGED:
      return {...state,
        subscribedFeeds: action.subs,
      };
    default:
      return state;
  }
}
