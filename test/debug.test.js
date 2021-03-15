// DEBUG=true node customers.test.js
// const { expect } = require('chai');

// const { process } = require('../triggers/get_customers.js');
const processCreate = require('../lib/actions/upsert_customers.js').process;

const {
  oihPerson,
} = require('./seed/transformations.seed');

const cfg = {
  API_KEY: 'ff853a38979b69d599d325fc072e743c',
  PASS: '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',
  otherServer: 'https://stest2021.myshopify.com',
};

// const msg = {
//   metadata: {},
//   data: {
//   },
// };

const msgCreate = {
  metadata: {
    recordUid: '5065629106349',
  },
  data: oihPerson.data,
};

(async () => {
  // const data = await process(msg, cfg);

  await processCreate(msgCreate, cfg);
})();
