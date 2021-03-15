/* eslint no-use-before-define: 0 */ // --> OFF
/* eslint no-restricted-syntax: 0 */ // --> OFF
/* eslint no-param-reassign: 0 */ // --> OFF
/* eslint consistent-return: 0 */ // --> OFF

/**
 * Derived from Auto-generated action file for "Shopify Admin API" API.
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
 * Operation: 'upsert_customers'
 * Endpoint Path: '/admin/api/2020-10/customers.json'
 * or update '/admin/api/2020-10/customers/{customer_id}.json'
 * Method: 'post' / 'put'
 *
 */

// how to pass the transformation function... no need
// pass the meta data
// create a new Object
// emit the message with the new emit function

// securities and auth methods
// check how to make the new ferryman and its transform functions functional // no need

const Swagger = require('swagger-client');
const uuid = require('uuid');
// const processWrapper = require('../services/process-wrapper');
const { transform } = require('@openintegrationhub/ferryman');
const spec = require('../spec.json');

const { personFromOih } = require('../transformations/personFromOih');

// parameter names for this call
// const PARAMETERS = [];

// mappings from connector field names to API field names
// const FIELD_MAP = {
//   requestBody: 'requestBody',
// };

function newMessage(body) {
  const msg = {
    id: uuid.v4(),
    attachments: {},
    body,
    headers: {},
    metadata: {},
  };

  return msg;
}

function processAction(msg, cfg) {
  const isVerbose = process.env.debug || cfg.verbose;

  console.log('msg:', msg);
  console.log('cfg:', cfg);

  if (isVerbose) {
    console.log(`---MSG: ${JSON.stringify(msg)}`);
    console.log(`---CFG: ${JSON.stringify(cfg)}`);
    console.log(`---ENV: ${JSON.stringify(process.env)}`);
  }

  const contentType = 'application/json';

  const oihUid = msg.metadata !== undefined && msg.metadata.oihUid !== undefined
    ? msg.metadata.oihUid
    : 'oihUid not set yet';
  const recordUid = msg.metadata !== undefined && msg.metadata.recordUid !== undefined
    ? msg.metadata.recordUid
    : undefined;
  const applicationUid = msg.metadata !== undefined && msg.metadata.applicationUid !== undefined
    ? msg.metadata.applicationUid
    : undefined;

  const transformedMessage = transform(msg, cfg, personFromOih);

  if (cfg.devMode) {
    console.log('Msg', JSON.stringify(msg));
    console.log('transformedMessage', JSON.stringify(transformedMessage));
  }

  const body = {
    customer: transformedMessage.data,
  };

  if (recordUid) {
    console.log('Updating entry ', recordUid);
    // body.customer.id = recordUid;
  }

  // mapFieldNames(body);

  const parameters = {};
  // for(let param of PARAMETERS) {
  //     parameters[param] = body[param];
  // }

  const newElement = {};
  const oihMeta = {
    applicationUid,
    oihUid,
    recordUid,
  };

  // credentials for this operation
  const securities = { BasicAuth: { username: cfg.API_KEY, password: cfg.PASS } };

  if (cfg.otherServer) {
    if (!spec.servers) {
      spec.servers = [];
    }
    spec.servers.push({ url: cfg.otherServer });
  }

  const callParams = {
    spec,
    operationId: 'create_customers',
    pathName: recordUid
      ? `/admin/api/2020-10/customers/${recordUid}.json`
      : '/admin/api/2020-10/customers.json',
    method: recordUid ? 'put' : 'post',
    parameters,
    requestContentType: contentType,
    requestBody: body,
    securities: { authorized: securities },
    server: spec.servers[cfg.server] || cfg.otherServer,
  };

  // console.log('callParams', callParams);

  // if(callParams.method === 'get'){
  //     delete callParams.requestBody;
  // }

  if (isVerbose) {
    const out = { ...callParams };
    out.spec = '[omitted]';
    console.log(`--SWAGGER CALL: ${JSON.stringify(out)}`);
  }

  try {
    // Call operation via Swagger client
    return Swagger.execute(callParams).then((data) => {
      // emit a single message with data
      // console.log('swagger data:', data);
      newElement.metadata = oihMeta;
      newElement.data = data.data.body;
      if (cfg.devMode) {
        console.log(JSON.stringify(newElement));
      }

      this.emit('data', newMessage(newElement));

      // if the response contains an array of entities, you can emit them one by one:

      // data.obj.someItems.forEach((item) => {
      //     this.emitData(item);
      // }
    }).catch((error) => {
      console.log('Error', JSON.stringify(error));
    });
  } catch (e) {
    console.log(e);
    console.log(callParams);
  }
}

// function mapFieldNames(obj) {
//   if (Array.isArray(obj)) {
//     obj.forEach(mapFieldNames);
//   } else if (typeof obj === 'object' && obj) {
//     Object.keys(obj).forEach((key) => {
//       mapFieldNames(obj[key]);
//
//       const goodKey = FIELD_MAP[key];
//       if (goodKey && goodKey !== key) {
//         obj[goodKey] = obj[key];
//         delete obj[key];
//       }
//     });
//   }
// }

// this wrapers offers a simplified emitData(data) function
module.exports = { process: processAction };
