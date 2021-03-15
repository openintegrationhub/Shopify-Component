//
// // DEBUG=true node customers.test.js
// const { expect } = require('chai');
//
// const getCustomers = require('../lib/triggers/get_customers.js').process;
// // const getCustomers = require('../lib/triggers/get_customers.js').process;
// // const getCustomers = require('../lib/triggers/get_customers.js').process;
//
// const {
//   // shopifyCustomer,
//   getCustomersSuccessful,
//   createCustomerSuccessful,
//   updateCustomerSuccessful,
// } = require('./seed/customers.seed');
//
// const cfg = {
//   API_KEY: 'ff853a38979b69d599d325fc072e743c',
//   PASS: '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',
//   otherServer: 'https://stest2021.myshopify.com',
// };
//
// const msg = {
//   metadata: {},
//   data: {
//   },
// };
//
// describe.only('Customer endpoints', () => {
//   before(async () => {
//   });
//   it('should get all shopify customers', async () => {
//     const data = await getCustomers(msg, cfg);
//     console.log(JSON.stringify(data));
//     expect(result).to.be.an('object');
//
//   });
//
//   // it('should create a shopify customer', async () => {
//   //   const result = await process(msg, cfg);
//   // });
//   //
//   // it('should update a shopify customer', async () => {
//   //   const result = await process(msg, cfg);
//   // });
//
//   // it('should delete a shopify customer', async () => {
//   //   const result = await process(msg, cfg);
//   // });
// });
