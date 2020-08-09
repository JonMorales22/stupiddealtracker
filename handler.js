'use strict';
const MusiciansFriendNotifer = require('./build/MusiciansFriendNotifier')

module.exports.track = async event => {
  const notifier = new MusiciansFriendNotifer.MusiciansFriendNotifier();
  // return {
  //       statusCode: 200,
  //       body: JSON.stringify(
  //         {
  //           message: 'huzzah! it completed successfully!',
  //           input: event,
  //         },
  //         null,
  //         2
  //       ),
  // };
  var response = {};
  try {
    var poop = await notifier.doWork();
    response = {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: poop,
          input: event,
        },
        null,
        2
      ),
    };
  } 
  catch(err){
    response = {
      statusCode: 400,
      body: JSON.stringify(
        {
          message: err,
          input: event
        },
         null,
        2
      )
    }
  }
  finally{
    return response;
  }
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
