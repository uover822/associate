let Seneca = require('seneca')
Seneca({tag: 'associate', timeout: 5000})
  //.test()
  //.test('print')
  //.use('monitor')
  .use('../associate.js')
  .listen(9005)
  .client({pin:'role:store', port:9045})
  .use('mesh')
