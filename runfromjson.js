// Generated by CoffeeScript 1.9.1
var protodef, util,
  hasProp = {}.hasOwnProperty;

protodef = require('rethinkdb/proto-def');

util = require('rethinkdb/util');

module.exports = function(conn, query, cb, opts) {
  var key, token, value;
  opts = opts || {};
  token = conn.nextToken++;
  conn.outstandingCallbacks[token] = {
    opts: opts,
    cb: cb
  };
  query = {
    global_optargs: {},
    type: protodef.Query.QueryType.START,
    query: query,
    token: token
  };
  for (key in opts) {
    if (!hasProp.call(opts, key)) continue;
    value = opts[key];
    query.global_optargs[util.fromCamelCase(key)] = r.expr(value).build();
  }
  return conn._sendQuery(query);
};