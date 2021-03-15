const nock = require('nock');

const shopifyCustomer = {
  id: 5065088565421,
  email: 'first@customer.de',
  accepts_marketing: false,
  created_at: '2021-03-11T09:24:10+01:00',
  updated_at: '2021-03-11T09:24:10+01:00',
  first_name: 'First',
  last_name: 'Customer',
  orders_count: 0,
  state: 'disabled',
  total_spent: '0.00',
  last_order_id: null,
  note: 'Top Customer',
  verified_email: true,
  multipass_identifier: null,
  tax_exempt: false,
  phone: '+4940123456789',
  tags: 'tag1, tag2',
  last_order_name: null,
  currency: 'EUR',
  addresses: [
    {
      id: 6234044235949,
      customer_id: 5065088565421,
      first_name: 'First2',
      last_name: 'Customer2',
      company: 'Some company',
      address1: 'Wendenstrasse 1',
      address2: '',
      city: 'Hamburg',
      province: '',
      country: 'Germany',
      zip: '20537',
      phone: '+49123456789',
      name: 'First2 Customer2',
      province_code: null,
      country_code: 'DE',
      country_name: 'Germany',
      default: true,
    },
  ],
  accepts_marketing_updated_at: '2021-03-11T09:24:10+01:00',
  marketing_opt_in_level: null,
  tax_exemptions: [],
  admin_graphql_api_id: 'gid:\\/\\/shopify\\/Customer\\/5065088565421',
  default_address: {
    id: 6234044235949,
    customer_id: 5065088565421,
    first_name: 'First2',
    last_name: 'Customer2',
    company: 'Some company',
    address1: 'Wendenstrasse 1',
    address2: '',
    city: 'Hamburg',
    province: '',
    country: 'Germany',
    zip: '20537',
    phone: '+49123456789',
    name: 'First2 Customer2',
    province_code: null,
    country_code: 'DE',
    country_name: 'Germany',
    default: true,
  },
};

// eslint-disable-next-line max-len
const getCustomersSuccessful = nock('https://stest2021.myshopify.com/admin/api/2020-10/customers.json?updated_at_min=1970-01-01T00%3A00%3A00.000Z%2B01%3A00')
  .get('')
  // .query({
  // })
  .reply(200, {
    customers: [
      shopifyCustomer,
    ],
  });

const createCustomerSuccessful = nock('https://stest2021.myshopify.com/admin/api/2020-10/customers.json')
  .post('')
  // .query({
  // })
  .reply(200, {});

const updateCustomerSuccessful = nock('https://stest2021.myshopify.com/admin/api/2020-10/customers.json')
  .put('')
  // .query({
  // })
  .reply(200, {});

module.exports = {
  shopifyCustomer,
  getCustomersSuccessful,
  createCustomerSuccessful,
  updateCustomerSuccessful,
};
