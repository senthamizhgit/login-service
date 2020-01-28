const MessageConsumer = require('./lib/worker/message-consumer');

const mc = new MessageConsumer();

(async function(){
await mc.start();
await mc.consumeMessage('logs')
})();