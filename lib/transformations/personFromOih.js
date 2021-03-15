/**
 * Copyright 2018 Wice GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

module.exports.personFromOih = (msg) => {
  if (Object.keys(msg).length === 0 && msg.constructor === Object) {
    return msg;
  }

  // Mapping contact Data to fields, first entry for each type wins
  let phone = '';
  let email = '';
  if (msg.data.contactData) {
    for (let i = 0; i < msg.data.contactData.length; i += 1) {
      if (
        (msg.data.contactData[i].type === 'phone' || msg.data.contactData[i].type === 'mobile')
        && msg.data.contactData[i].value.trim() !== ''
      ) {
        if (phone === '') phone = msg.data.contactData[i].value.trim();
      } else if (msg.data.contactData[i].type === 'email' && msg.data.contactData[i].value.trim() !== '') {
        if (email === '') email = msg.data.contactData[i].value.trim();
      }
    }
  }

  const addresses = [];
  if ('addresses' in msg.data && msg.data.addresses.length > 0) {
    const { length } = msg.data.addresses;
    for (let i = 0; i < length; i += 1) {
      addresses.push(
        {
          // "customer_id": msg.metadata.recordUid,
          // "first_name": msg.data.firstName,
          // "last_name": msg.data.lastName,
          // "company":"Some company",
          address1: `${msg.data.addresses[i].street} ${msg.data.addresses[i].streetNumber}`,
          address2: msg.data.addresses[i].unit ? msg.data.addresses[i].unit : '',
          city: msg.data.addresses[i].city ? msg.data.addresses[i].city : '',
          province: msg.data.addresses[i].region ? msg.data.addresses[i].region : '',
          zip: msg.data.addresses[i].zipcode ? msg.data.addresses[i].zipcode : '',
          country_name: msg.data.addresses[i].country ? msg.data.addresses[i].country : '',
          // "phone":"+49123456789",
          // "name":"First2 Customer2",
          // "province_code":null,
          country_code: msg.data.addresses[i].countryCode ? msg.data.addresses[i].countryCode : '',
          default: msg.data.addresses[i].primaryContact ? msg.data.addresses[i].primaryContact : false,
        },
      );
    }
  }

  let tags = [];
  if ('categories' in msg.data && msg.data.categories.length > 0) {
    const { length } = msg.data.categories;
    for (let i = 0; i < length; i += 1) {
      tags.push(msg.data.categories[i].label);
    }
  }

  tags = tags.join(',');

  const expression = {
    metadata: {
      operation: msg.operation,
      oihUid: msg.metadata.oihUid ? msg.metadata.oihUid : '',
      applicationUid: msg.metadata.applicationUid ? msg.metadata.applicationUid : '',
      iamToken: msg.metadata.iamToken ? msg.metadata.iamToken : undefined,
      recordUid: msg.metadata.recordUid,
    },
    data: {
      // id: msg.metadata.recordUid,
      first_name: msg.data.firstName ? msg.data.firstName : '',
      last_name: msg.data.lastName ? msg.data.lastName : '',
      email, // Must be unique
      phone, // Must be unique
      // "orders_count":0,
      // "state":"disabled",
      // "total_spent":"0.00",
      // "last_order_id":null,
      // "note":"Top Customer",
      verified_email: true,
      // "multipass_identifier":null,
      // "tax_exempt":false,
      tags,
      // "last_order_name":null,
      // "currency":"EUR",
      addresses,
    },
  };

  // Remove null values
  Object.keys(expression.data).forEach(
    (key) => (expression.data[key] == null || expression.data[key] === undefined)
  && delete expression.data[key],
  );

  // Remove value-less array items
  if (expression.contactData) expression.contactData.filter((cd) => cd.value);
  if (expression.addresses) expression.addresses.filter((adr) => Object.keys(adr).length > 0);

  return expression;
};
