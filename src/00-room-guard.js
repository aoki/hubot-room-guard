// Description:
//   room guard and operator guard
// Configuration:
//   HUBOT_ROOM_GUARD_ENABLE_ROOMS []
//   HUBOT_ROOM_GUARD_ENABLE_OPERATORS []

// console.log( '✔ Load: ' + __filename.split('/').pop());

var _ = require('lodash');

function loadConfig(str) {
  try {
    if (typeof str === 'undefined') return [];
    else return JSON.parse(str);
  } catch (e) {
    return console.error(e);
  }
}

var config = {
  rooms: loadConfig(process.env.HUBOT_ROOM_GUARD_ENABLE_ROOMS),
  operators: loadConfig(process.env.HUBOT_ROOM_GUARD_ENABLE_OPERATORS)
};

module.exports = function(robot) {
  'use strict';

  var operators = config.operators;
  var rooms = config.rooms;

  robot.hear(/.*/, function(msg) {

    // Validate permission to operation
    if (! _.includes(operators, msg.envelope.user.name)) {
      return;
    }

    // Enable rooms
    if (! _.includes(rooms, msg.envelope.room)) {
      msg.finish();
    }

    // Ignore users by regex
    if (/bot/.test(msg.envelope.user.name)) {
      msg.finish();
    }

  });
};
