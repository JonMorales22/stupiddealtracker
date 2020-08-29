'use strict';
const MusiciansFriendNotifer = require('./build/MusiciansFriendNotifier')

module.exports.track = async event => {
  const notifier = new MusiciansFriendNotifer.MusiciansFriendNotifier();
  try {
    var result = await notifier.doWork(event.target);
    return createResponse(200, result, event);
  } 
  catch(err) {
    return createResponse(400, err, event);
  }
};

function createResponse(code, message, event) {
  return {
    statusCode: code,
    body: JSON.stringify(
      {
        message: message,
        input: event
      },
       null,
      2
    )
  }
}
