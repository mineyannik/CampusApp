import fetchNewsData from './helpers';
import { feeds } from '../../util/Constants';

// ACTIONS
// action that is dispatched whenever the news will we fetched
const REQUEST_NEWS = 'REQUEST_NEWS';

export function requestNews() {
  return {
    type: REQUEST_NEWS
  };
}

// action that is dispatched whenever fetching the news finished
const RECEIVE_NEWS = 'RECEIVE_NEWS';

export function receiveNews(news) {
  return {
    type: RECEIVE_NEWS,
    news: news,
    receivedAt: Date.now()
  };
}

// action that is dispatched whenever an error occurred while fetching the news data
const ERROR_FETCHING_NEWS = 'ERROR_FETCHING_NEWS';

export function errorFetchingNews() {
  return {
    type: ERROR_FETCHING_NEWS,
    news: {}
  };
}

// action that is dispatched when news tab changes (news-events-stuv)
const TAB_CHANGED = 'TAB_CHANGED';

export function tabChanged(tab) {
  return {
    type: TAB_CHANGED,
    tab
  };
}

export function fetchNews() {
  // a function as actions (enabled by thunk)
  return async function(dispatch) {
    dispatch(requestNews());
    try {
      let response, responseBody;
      let newsItems = {};
      await Promise.all(
        feeds.map(async feed => {
          response = await fetch(
            `https://www.dhbw-loerrach.de/index.php?id=${feed.id}`
          );
          if (!response.ok) {
            // server problem for a particular feed
            newsItems[feed.key] = null;
          } else {
            responseBody = await response.text();
            newsItems[feed.key] = fetchNewsData(responseBody);
          }
        })
      );
      dispatch(receiveNews(newsItems));
    } catch (e) {
      console.warn('Error fetching news:', e);
      dispatch(errorFetchingNews());
    }
  };
}

// REDUCER
export function news(
  state = {
    isFetching: false,
    networkError: false,
    lastUpdated: null,
    news: [],
    tab: 0
  },
  action
) {
  switch (action.type) {
    case REQUEST_NEWS:
      return {
        ...state,
        isFetching: true,
        networkError: false
      };
    case RECEIVE_NEWS:
      return {
        ...state,
        isFetching: false,
        news: action.news,
        networkError: false,
        lastUpdated: action.receivedAt
      };
    case ERROR_FETCHING_NEWS:
      return {
        ...state,
        isFetching: false,
        networkError: true
      };
    case TAB_CHANGED:
      return {
        ...state,
        tab: action.tab
      };
    default:
      return state;
  }
}
