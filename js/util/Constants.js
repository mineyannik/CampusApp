// @flow
'use strict';

module.exports = {
  smallFont: 12,
  bigFont: 17,
  listViewRowPaddingHorizontal: 17,
  listViewRowPaddingVertical: 8,
  roles: ['Student/in','Lehrbeauftragte/r','Mitarbeiter/in','Gast'],
  feeds: [
      {name: 'News', key: 'news', id: 3965, type: 105, subId: 1},
      {name: 'Termine', key: 'events', id: 59, type: 100, subId: 2},
      {name: 'StuV', key: 'stuvdhbwloerrach', id: 3965, type: 999, subId: 3}, // 999 = Facebook feed
      {name: 'Notfälle', key: 'news', id: 3965, type: 105, subId: 4}
  ],
};