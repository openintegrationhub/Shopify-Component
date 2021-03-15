/* eslint "max-len":  ["error", { "code": 170 }] */
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

module.exports.personToOih = (msg) => {
  if (Object.keys(msg).length === 0 && msg.constructor === Object) {
    return msg;
  }

  const contactData = [];

  if ('email' in msg.data && msg.data.email) {
    contactData.push({
      type: 'email',
      value: msg.data.email,
    });
  }

  if ('phone' in msg.data && msg.data.phone) {
    contactData.push({
      type: 'phone',
      value: msg.data.phone,
    });
  }

  const addresses = [];
  // let company;

  if ('addresses' in msg.data) {
    const { length } = msg.data.addresses;
    for (let i = 0; i < length; i += 1) {
      // if(!company && msg.data.addresses[i].company)

      const streetParts = `${msg.data.addresses[i].address1}`.trim().replace(/[\s]{2,}/, ' ').split(' ');
      const streetNumber = streetParts.pop();
      const street = streetParts.join(' ');

      if ('phone' in msg.data.addresses[i] && msg.data.addresses[i].phone) {
        contactData.push({
          type: 'phone',
          value: msg.data.addresses[i].phone,
        });
      }

      addresses.push({
        street,
        streetNumber,
        unit: msg.data.addresses[i].address2 ? msg.data.addresses[i].address2 : '',
        zipcode: msg.data.addresses[i].zip ? msg.data.addresses[i].zip : '',
        city: msg.data.addresses[i].city ? msg.data.addresses[i].city : '',
        district: '',
        region: msg.data.addresses[i].province ? msg.data.addresses[i].region : '',
        country: msg.data.addresses[i].country_name ? msg.data.addresses[i].country : '',
        countryCode: msg.data.addresses[i].country_code ? msg.data.addresses[i].country_code : '',
        primaryContact: msg.data.addresses[i].default ? msg.data.addresses[i].default : '',
        description: '',
      });
    }
  }

  const categories = [];
  if ('tags' in msg.data && msg.data.tags) {
    const tags = msg.data.tags.split(',');
    const { length } = tags;
    for (let i = 0; i < length; i += 1) {
      const tag = tags[i].trim();
      if (tag !== '') {
        categories.push({
          label: tag,
        });
      }
    }
  }

  const recordUid = msg.data.id;

  const expression = {
    metadata: {
      recordUid,
      operation: msg.operation,
      applicationUid: (msg.metadata.applicationUid !== undefined && msg.metadata.applicationUid !== null) ? msg.metadata.applicationUid : 'appUid not set yet',
      iamToken: (msg.metadata.iamToken !== undefined && msg.metadata.iamToken !== null) ? msg.metadata.iamToken : undefined,
      domainId: (msg.metadata.domainId !== undefined && msg.metadata.domainId !== null) ? msg.metadata.domainId : undefined,
      schema: (msg.metadata.schema !== undefined && msg.metadata.schema !== null) ? msg.metadata.schema : undefined,
    },
    data: {
      firstName: msg.data.first_name ? msg.data.first_name : '',
      lastName: msg.data.last_name ? msg.data.last_name : '',
      addresses,
      contactData,
      categories,
    },
  };

  // "email":"erste@kunde.de
  // "accepts_marketing":false,
  // "first_name":"Erster",
  // "last_name":"Kunde",
  // "note":"Top Customer",
  // "verified_email":true,
  //
  // "phone":"+4940123456789",
  //
  // "addresses":[
  //   {"id":6234044235949,
  //   "customer_id":5065088565421,
  //   "first_name":"Erster2",
  //   "last_name":"Kunde2",
  //   "company":"Some company",
  //   "address1":"Wendenstrasse 1",
  //   "address2":"",
  //   "city":"Hamburg",
  //   "province":"",
  //   "country":"Germany",
  //   "zip":"20537",
  //   "phone":"+49123456789",
  //   "name":"Erster2 Kunde2","province_code":null,
  //   "country_code":"DE",
  //   "country_name":"Germany","default":true}
  // ],
  // "accepts_marketing_updated_at":"2021-03-11T09:24:10+01:00",
  // "marketing_opt_in_level":null,

  // Remove null values
  Object.keys(expression.data).forEach(
    (key) => (expression.data[key] == null || expression.data[key] === undefined)
  && delete expression.data[key],
  );

  return expression;
};
