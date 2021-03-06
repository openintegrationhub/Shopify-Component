/* eslint no-use-before-define: 0 */ // --> OFF
/* eslint no-restricted-syntax: 0 */ // --> OFF
/* eslint no-param-reassign: 0 */ // --> OFF
/* eslint consistent-return: 0 */ // --> OFF

/**
 * Auto-generated action file for "Shopify Admin API" API.
 *
 * Generated at: 2021-03-09T14:48:32.575Z
 * Mass generator version: 1.0.0
 *
 * : shopify-connector
 * Copyright © 2020,  AG
 *
 * All files of this connector are licensed under the Apache 2.0 License. For details
 * see the file LICENSE on the toplevel directory.
 *
 *
 * Operation: 'get_customers_search'
 * Endpoint Path: '/admin/api/2020-10/customers/search.json'
 * Method: 'get'
 *
 */

// how to pass the transformation function... no need
// pass the meta data
// create a new Object
// emit the message with the new emit function

// securities and auth methods
// check how to make the new ferryman and its transform functions functional // no need

const Swagger = require('swagger-client');
// const uuid = require('uuid');
// const processWrapper = require('../services/process-wrapper');
const { transform } = require('@openintegrationhub/ferryman');
const spec = require('../spec.json');

const { personToOih } = require('../transformations/personToOih');

// parameter names for this call
const PARAMETERS = [
  'order',
  'query',
  'limit',
  'fields',
];

// mappings from connector field names to API field names
const FIELD_MAP = {
  order: 'order',
  query: 'query',
  limit: 'limit',
  fields: 'fields',
};

// function newMessage(body) {
//   const msg = {
//     id: uuid.v4(),
//     attachments: {},
//     body,
//     headers: {},
//     metadata: {},
//   };
//
//   return msg;
// }

function processAction(msg, cfg, snapshot = {}) {
  const isVerbose = process.env.debug || cfg.verbose;

  // Set the snapshot if it is not provided

  if (!snapshot.lastUpdated) {
    const startTime = new Date(0);
    const sign = (startTime.getTimezoneOffset() <= 0) ? '+' : '-';
    const offsetHours = `${Math.abs(startTime.getTimezoneOffset() / 60)}`.padStart(2, '0');
    const offsetMinutes = `${Math.abs(startTime.getTimezoneOffset() % 60)}`.padStart(2, '0');

    const fullTime = `${startTime.toISOString().replace('Z', '')}${sign}${offsetHours}:${offsetMinutes}`;
    console.log(fullTime);

    snapshot.lastUpdated = fullTime;
  }

  console.log('msg:', msg);
  console.log('cfg:', cfg);

  if (isVerbose) {
    console.log(`---MSG: ${JSON.stringify(msg)}`);
    console.log(`---CFG: ${JSON.stringify(cfg)}`);
    console.log(`---ENV: ${JSON.stringify(process.env)}`);
  }

  const contentType = undefined;

  const body = msg.data;
  mapFieldNames(body);

  const parameters = {};
  for (const param of PARAMETERS) {
    parameters[param] = body[param];
  }

  const oihUid = msg.metadata !== undefined && msg.metadata.oihUid !== undefined
    ? msg.metadata.oihUid
    : 'oihUid not set yet';
  const recordUid = msg.metadata !== undefined && msg.metadata.recordUid !== undefined
    ? msg.metadata.recordUid
    : undefined;
  const applicationUid = msg.metadata !== undefined && msg.metadata.applicationUid !== undefined
    ? msg.metadata.applicationUid
    : undefined;

  // const newElement = {};
  const oihMeta = {
    applicationUid,
    oihUid,
    recordUid,
  };

  // credentials for this operation
  let securities = {};
  if (cfg.API_KEY && cfg.PASS) {
    securities = { BasicAuth: { username: cfg.API_KEY, password: cfg.PASS } };
  } else {
    securities = {
      oAuth2: {
        authorized: {
          oAuth2: {
            token: {
              access_token: cfg.accessToken,
            },
          },
        },
      },
    };
  }

  if (cfg.otherServer) {
    if (!spec.servers) {
      spec.servers = [];
    }
    spec.servers.push({ url: cfg.otherServer });
  }

  const callParams = {
    spec,
    operationId: 'get_customers_search',
    pathName: '/admin/api/2020-10/customers/search.json',
    method: 'get',
    parameters,
    requestContentType: contentType,
    requestBody: body,
    securities: { authorized: securities },
    server: spec.servers[cfg.server] || cfg.otherServer,
  };
  if (callParams.method === 'get') {
    delete callParams.requestBody;
  }

  if (isVerbose) {
    const out = { ...callParams };
    out.spec = '[omitted]';
    console.log(`--SWAGGER CALL: ${JSON.stringify(out)}`);
  }

  // Call operation via Swagger client
  return Swagger.execute(callParams).then((data) => {
    // emit messages with data
    console.log('swagger data:', data);

    if (data.body.customers && Array.isArray(data.body.customers)) {
      let newest = snapshot.lastUpdated;
      let newestNumeric = Date.parse(newest);

      data.body.customers.forEach((item) => {
        const newMsg = {
          metadata: oihMeta,
          data: item,
        };

        const createdAt = Date.parse(item.created_at);
        if (createdAt > newestNumeric) {
          newest = item.created_at;
          newestNumeric = createdAt;
        }
        const updatedAt = Date.parse(item.updated_at);
        if (updatedAt > newestNumeric) {
          newest = item.updated_at;
          newestNumeric = updatedAt;
        }

        const transformedMessage = transform(newMsg, cfg, personToOih);

        this.emit('data', transformedMessage);
      });

      // Add newest date to snapshot
      snapshot.lastUpdated = newest;
      console.error(`New snapshot: ${JSON.stringify(snapshot, undefined, 2)}`);
      this.emit('snapshot', snapshot);
    }
  });
}

function mapFieldNames(obj) {
  if (Array.isArray(obj)) {
    obj.forEach(mapFieldNames);
  } else if (typeof obj === 'object' && obj) {
    Object.keys(obj).forEach((key) => {
      mapFieldNames(obj[key]);

      const goodKey = FIELD_MAP[key];
      if (goodKey && goodKey !== key) {
        obj[goodKey] = obj[key];
        delete obj[key];
      }
    });
  }
}

// this wrapers offers a simplified emitData(data) function
module.exports = { process: processAction };
