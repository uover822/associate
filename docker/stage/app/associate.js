const client = require('prom-client')
const collectDefaultMetrics = client.collectDefaultMetrics

let Promise = require('bluebird')
let ip = require('ip')

const registry = new client.Registry()

module.exports = function associate(options) {
  
  let Seneca = this
  let senact = Promise.promisify(Seneca.act, {context: Seneca})

  client.collectDefaultMetrics({registry})

  let gauges = {}

  function pack (begin_ts, end_ts) {
    // pack begin_ts with 1/ e_tm
    let pe_tm = 1 / (end_ts - begin_ts)
    return begin_ts + pe_tm
  }

  /*
  Seneca.add({role:'associate', cmd:'healthy'}, async (msg, reply) => {
    try {
      let Seneca = this
      // Enable the collection of default metrics

      let r = 'yup'

      return reply(null,{result:r})
    } catch(e) {
      console.log(e)
    }
  })
  */

  Seneca.add({role:'associate', cmd:'metrics.collect'}, async (msg, reply) => {
    try {
      let Seneca = this
      // Enable the collection of default metrics

      let r = (await registry.metrics())

      return reply(null,{result:r})
    } catch(e) {
      console.log(e)
    }
  })

  Seneca.add({role:'associate', cmd:'add'}, async (msg,reply) => {

    let begin_ts = Date.now()

    if (!gauges['associate.add.ts'])
      gauges['associate.add.ts'] = new client.Gauge({
        name: 'perf_associate_add_ts',
        help: 'ts when adding a associate',
        labelNames: ['event','return_code','service','cluster','app','user','ip','cid'],
        registers: [registry]
      })

    try {
      let a = (await senact('role:store,cmd:addAssociate',
                            {sid:msg.sid,tid:msg.tid,cid:msg.cid,auth:msg.auth}).then ((o) => {
                              return o
                            }))
      gauges['associate.add.ts'].set({event:'associate.add', return_code:'200', service:'associate', cluster:process.env.cluster, app:process.env.app, user:process.env.user, ip:ip.address(), cid:msg.cid}, pack(begin_ts, Date.now()))

      return reply(null,a)
    } catch(e) {
      console.log(e)
      gauges['associate.add.ts'].set({event:'associate.add', return_code:'500', service:'associate', cluster:process.env.cluster, app:process.env.app, user:process.env.user, ip:ip.address(), cid:{}}, pack(begin_ts, Date.now()))
    }
  })

  Seneca.add({role: 'associate', cmd:'get'}, async (msg,reply) => {

    let begin_ts = Date.now()

    if (!gauges['associate.get.ts'])
      gauges['associate.get.ts'] = new client.Gauge({
        name: 'perf_associate_get_ts',
        help: 'ts when getting a associate',
        labelNames: ['event','return_code','service','cluster','app','user','ip','cid'],
        registers: [registry]
      })

    try {
      let a = (await senact('role:store,cmd:getAssociate',
                            {id:msg.id,cid:msg.cid}).then ((o) => {
                              return o
                            }))
      gauges['associate.get.ts'].set({event:'associate.get', return_code:'200', service:'associate', cluster:process.env.cluster, app:process.env.app, user:process.env.user, ip:ip.address(), cid:msg.cid}, pack(begin_ts, Date.now()))

      return reply(null,a)
    } catch(e) {
      console.log(e)
      gauges['associate.get.ts'].set({event:'associate.get', return_code:'500', service:'associate', cluster:process.env.cluster, app:process.env.app, user:process.env.user, ip:ip.address(), cid:{}}, pack(begin_ts, Date.now()))
    }
  })

  Seneca.add({role: 'associate', cmd:'getExisting'}, async (msg,reply) => {

    let begin_ts = Date.now()

    if (!gauges['associate.get_existing.ts'])
      gauges['associate.get.existing.ts'] = new client.Gauge({
        name: 'perf_associate_get_existing_ts',
        help: 'ts when getting an existing associate',
        labelNames: ['event','return_code','service','cluster','app','user','ip','cid'],
        registers: [registry]
      })

    try {
      let a = (await senact('role:store,cmd:getExistingAssociate',
                            {sid:msg.sid,tid:msg.tid,cid:msg.cid}).then ((o) => {
                              return o
                            }))
      gauges['associate.get.existing.ts'].set({event:'associate.get.existing', return_code:'200', service:'associate', cluster:process.env.cluster, app:process.env.app, user:process.env.user, ip:ip.address(), cid:msg.cid}, pack(begin_ts, Date.now()))

      return reply(null,a)
    } catch(e) {
      console.log(e)
      gauges['associate.get.existing.ts'].set({event:'associate.get.existing', return_code:'500', service:'associate', cluster:process.env.cluster, app:process.env.app, user:process.env.user, ip:ip.address(), cid:{}}, pack(begin_ts, Date.now()))
    }
  })

  Seneca.add({role:'associate', cmd:'upd'}, async (msg,reply) => {

    let begin_ts = Date.now()

    if (!gauges['associate.upd.ts'])
      gauges['associate.upd.ts'] = new client.Gauge({
        name: 'perf_associate_upd_ts',
        help: 'ts when updating a associate',
        labelNames: ['event','return_code','service','cluster','app','user','ip','cid'],
        registers: [registry]
      })

    try {
      let a = (await senact('role:store,cmd:updAssociate',
                            {relations:msg.relations,sid:msg.sid,id:msg.id,tid:msg.tid,cid:msg.cid}).then ((o) => {
                              return o
                            }))
      gauges['associate.upd.ts'].set({event:'associate.upd', return_code:'200', service:'associate', cluster:process.env.cluster, app:process.env.app, user:process.env.user, ip:ip.address(), cid:msg.cid}, pack(begin_ts, Date.now()))

      return reply(null,a)
    } catch(e) {
      console.log(e)
      gauges['associate.upd.ts'].set({event:'associate.upd', return_code:'500', service:'associate', cluster:process.env.cluster, app:process.env.app, user:process.env.user, ip:ip.address(), cid:{}}, pack(begin_ts, Date.now()))
    }
  })

  Seneca.add({role:'associate', cmd:'drp'}, async (msg,done) => {

    let begin_ts = Date.now()

    if (!gauges['associate.drp.ts'])
      gauges['associate.drp.ts'] = new client.Gauge({
        name: 'perf_associate_drp_ts',
        help: 'ts when dropping a associate',
        labelNames: ['event','return_code','service','cluster','app','user','ip','cid'],
        registers: [registry]
      })

    try {
      (await senact('role:store,cmd:drpAssociate',
                    {id:msg.id,cid:msg.cid}).then ((o) => {
                      return o
                    }))
      gauges['associate.drp.ts'].set({event:'associate.drp', return_code:'200', service:'associate', cluster:process.env.cluster, app:process.env.app, user:process.env.user, ip:ip.address(), cid:msg.cid}, pack(begin_ts, Date.now()))
      done(null,{})
    } catch(e) {
      console.log(e)
      gauges['associate.drp.ts'].set({event:'associate.drp', return_code:'500', service:'associate', cluster:process.env.cluster, app:process.env.app, user:process.env.user, ip:ip.address(), cid:{}}, pack(begin_ts, Date.now()))
    }
  })
}
