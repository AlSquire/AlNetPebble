/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');

function fetchJSON(url) {
  ajax(
    {
      url: url,
      type: 'json'
    }, function(data, status, request) {
      displayJSON(data);
    }, function(error, status, request) {
      var card = UI.Card({
        title: "Error",
        body: status
      });
      card.show();
    }
  );
}

function displayJSON (json) {
  if (json.hasOwnProperty('menu')) {
    var menu = new UI.Menu(json.menu);
    menu.on('select', function(e) {
      if (e.item.hasOwnProperty('url')) {
        fetchJSON(e.item.url);
      }
    });
    menu.show();
  } else if (json.hasOwnProperty('card')) {
    var card = new UI.Card(json.card);
    card.show();
  }
}

var menuUrl = "https://gist.githubusercontent.com/AlSquire/5b29d5c0ddbddac6e502/raw/menu.json";

fetchJSON(menuUrl);

