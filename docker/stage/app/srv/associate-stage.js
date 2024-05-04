const Seneca = require('seneca')

Seneca({tag: 'associate', legacy: {meta: true}, timeout: 5000})
//  .use('zipkin-tracer', {host: 'zipkin', sampling: 1})
//  .use('statsd', {host: 'stats'})
  .use('entity')
  .use('../associate.js')
  .listen(8005)
  .client({pin:'role:store', host:'store', port:8045})
