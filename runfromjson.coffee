protodef = require 'rethinkdb/proto-def'
util = require 'rethinkdb/util'

module.exports = (conn, query, cb, opts) ->
  opts = opts or {}
  
  token = conn.nextToken++
  conn.outstandingCallbacks[token] = opts: opts, cb: cb
  
  query =
    global_optargs: {}
    type: protodef.Query.QueryType.START
    query: query
    token: token

  for own key, value of opts
    query.global_optargs[util.fromCamelCase(key)] = r.expr(value).build()
  
  conn._sendQuery query