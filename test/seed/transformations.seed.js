const oihPerson = {
  metadata: {
    applicationUid: 'appUid not set yet',
    domainId: undefined,
    iamToken: undefined,
    operation: undefined,
    recordUid: 5065088565421,
    schema: undefined,

  },
  data: {
    firstName: 'First',
    lastName: 'Customer',
    addresses: [
      {
        street: 'Wendenstrasse',
        streetNumber: '1',
        unit: '',
        zipcode: '20537',
        city: 'Hamburg',
        district: '',
        region: '',
        country: 'Germany',
        countryCode: 'DE',
        primaryContact: true,
        description: '',
      },
    ],
    contactData: [
      {
        type: 'email',
        value: 'first@customer.de',
      },
      {
        type: 'phone',
        value: '+4940123456789',
      },
      {
        type: 'phone',
        value: '+49123456789',
      },
    ],
    categories: [
      { label: 'tag1' },
      { label: 'tag2' },
    ],
  },
};

const shopifyCustomer = {
  metadata: {},
  data: {
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
  },
};

module.exports = {
  oihPerson,
  shopifyCustomer,
};
