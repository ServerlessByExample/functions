'use strict';

const rp = require('request-promise-native');

module.exports = async function(context) {
  const { request: { body: { location } } } = context;

  if (!location) {
    return {
      status: 400,
      body: {
        text: 'You must provide a location.',
      },
    };
  }

  try {
    const uri = `https://query.yahooapis.com/v1/public/yql?q=select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text="${location}") and u="c"&format=json`;
    const response = await rp(uri);
    const condition = JSON.parse(response).query.results.channel.item.condition;
    const { text, temp: temperature } = condition;

    return {
      status: 200,
      body: {
        text: `It is ${temperature} celsius degrees in ${location} and ${text}`,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (e) {
    console.error(e);
    return { status: 500, body: e };
  }
};