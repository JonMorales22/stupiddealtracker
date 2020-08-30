'use strict';
const SavingsNotifier = require('./build/SavingsNotifier')
const AmazonNotifier = require('./build/AmazonNotifier')

module.exports.track = async event => {
  const notifier = new SavingsNotifier.SavingsNotifier(event.searchList, new AmazonNotifier.AmazonNotifier());
  try {
    console.log(`SearchList = ${event.searchList}`);
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
