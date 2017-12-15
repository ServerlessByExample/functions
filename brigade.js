const { events } = require('brigadier');

events.on('push', (brigadeEvent, project) => {
  console.log('Hello world!');
});
