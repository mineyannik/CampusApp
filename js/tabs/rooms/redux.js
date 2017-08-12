// @flow
'use strict';

import * as Papa from 'papaparse';
import RNFS from 'react-native-fs';
import {roomsDb} from '../../../env.js';
import {REHYDRATE} from 'redux-persist/constants'

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
    const {completeList} = getState().rooms;
    const searchResults = completeList.filter(entry => {
        return(
            entry['Raum'].toLowerCase().includes(searchString.toLowerCase()) ||
            entry['Begriff 1'].toLowerCase().includes(searchString.toLowerCase()) ||
            entry['Begriff 2'].toLowerCase().includes(searchString.toLowerCase()) ||
            entry['Begriff 3'].toLowerCase().includes(searchString.toLowerCase()) ||
            entry['Begriff 4'].toLowerCase().includes(searchString.toLowerCase())
        );
    })
    dispatch(searchFinished(searchResults));
  };
}

const CSV_PARSE_STARTED = 'CSV_PARSE_STARTED';
export function csvParseStarted() {
    return {
        type: CSV_PARSE_STARTED,
    }
    
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
        dispatch(csvParseStarted());
        const results = roomsDb;
                /*const csvFile = await RNFS.readDirAssets('/');
        console.log(csvFile);

        const file = await RNFS.readFile(appRootPath + '/demo-rooms.csv');
        const results = await Papa.parse(csvFile, {
            header: true,
        });*/
        dispatch(csvParseFinished(results));
    }
}

const SELECT_ROOM = 'SELECT_ROOM';
export function selectRoom(room) {
    return {
        type: SELECT_ROOM,
        selectedRoom: room
    }
}

const UNSELECT_ROOM = 'UNSELECT_ROOM';
export function unselectRoom() {
    return {
        type: UNSELECT_ROOM
    }
}

// REDUCER
export function rooms(state = {
  isLoading: false,
  searchResults: null,
  completeList: null,
  selectedRoom: null
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
    case SELECT_ROOM:
        return {...state,
            selectedRoom: action.selectedRoom
        };
    case UNSELECT_ROOM:
        return {...state,
            selectedRoom: null
        };
    case REHYDRATE:
        const incoming = action.payload.rooms;
        if (incoming) {
            return {...state, ...incoming, searchResults: null} // reset cached search results
        }
        return state;
    default:
      return state;
  }
}
