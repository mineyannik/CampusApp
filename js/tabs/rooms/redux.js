// @flow
'use strict';

import * as Papa from 'papaparse';

// ACTIONS
const SEARCH_STARTED = 'SEARCH_STARTED';
export function searchStarted() {
    return {
        type: SEARCH_STARTED,
    }
}

const SEARCH_FINISHED = 'SEARCH_FINISHED';
export function searchFinished(results) {
    return {
        type: SEARCH_FINISHED,
        results: results
    }
}

export function runSearch(searchString) {
  return async function (dispatch, getState) {
    dispatch(searchStarted());
    
    //search
    console.log('searching for: ' + searchString);

    dispatch(searchFinished([]));
  };
}

const CSV_PARSE_STARTED = 'CSV_PARSE_STARTED';
export function csvParseStarted() {
    type: CSV_PARSE_STARTED
}

const CSV_PARSE_FINISHED = 'CSV_PARSE_FINSIHED';
export function csvParseFinished(parsedList) {
    return {
        type: CSV_PARSE_FINISHED,
        parsedList: parsedList
    }
}

export function doInitialParseOfCsvData() {
    return async function (dispatch, getState) {
        //dispatch(csvParseStarted());
        const results = Papa.parse('../../rooms-demo.csv', {
            download: true,
            header: true,
            worker: false
        });
        //dispatch(csvParseFinished(results));
    }
}

// REDUCER
export function rooms(state = {
  isLoading: false,
  searchResults: null,
  completeList: null
}, action) {
  switch (action.type) {
    case SEARCH_STARTED:
      return {...state,
        isLoading: true
      };
    case SEARCH_FINISHED:
      return {...state,
        isLoading: false,
        searchResults: action.results,
      };
    case CSV_PARSE_STARTED:
        return {...state,
            isLoading: true
        };
    case CSV_PARSE_FINISHED:
        return {...state,
            isLoading: false,
            completeList: action.parsedList
        };
    default:
      return state;
  }
}
