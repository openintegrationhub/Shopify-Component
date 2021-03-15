const { expect } = require('chai');

const { personToOih } = require('../lib/transformations/personToOih');
const { personFromOih } = require('../lib/transformations/personFromOih');

const { oihPerson, shopifyCustomer } = require('./seed/transformations.seed');

describe('Transformations', () => {
  before(async () => {
  });
  it('should transform shopify customer to OIH person format', async () => {
    const result = personToOih(shopifyCustomer);
    expect(result).to.be.an('object');

    expect(result.metadata.recordUid).to.equal(5065088565421);
    expect(result.data.firstName).to.equal('First');
    expect(result.data.lastName).to.equal('Customer');

    expect(result.data.contactData).to.have.lengthOf(3);
    expect(result.data.contactData[0].type).to.equal('email');
    expect(result.data.contactData[0].value).to.equal('first@customer.de');
    expect(result.data.contactData[1].type).to.equal('phone');
    expect(result.data.contactData[1].value).to.equal('+4940123456789');
    expect(result.data.contactData[2].type).to.equal('phone');
    expect(result.data.contactData[2].value).to.equal('+49123456789');

    expect(result.data.addresses).to.have.lengthOf(1);
    expect(result.data.addresses[0].street).to.equal('Wendenstrasse');
    expect(result.data.addresses[0].streetNumber).to.equal('1');
    expect(result.data.addresses[0].unit).to.equal('');
    expect(result.data.addresses[0].zipcode).to.equal('20537');
    expect(result.data.addresses[0].city).to.equal('Hamburg');
    expect(result.data.addresses[0].country).to.equal('Germany');
    expect(result.data.addresses[0].countryCode).to.equal('DE');
    expect(result.data.addresses[0].primaryContact).to.equal(true);
    expect(result.data.addresses[0].description).to.equal('');

    expect(result.data.categories).to.have.lengthOf(2);
    expect(result.data.categories[0].label).to.equal('tag1');
    expect(result.data.categories[1].label).to.equal('tag2');
  });

  it('should transform OIH person to shopify customer format', async () => {
    const result = personFromOih(oihPerson);

    expect(result).to.be.an('object');
    expect(result.metadata.recordUid).to.equal(5065088565421);

    expect(result.data.first_name).to.equal('First');
    expect(result.data.last_name).to.equal('Customer');

    expect(result.data.email).to.equal('first@customer.de');
    expect(result.data.phone).to.equal('+4940123456789');

    expect(result.data.addresses).to.have.lengthOf(1);

    expect(result.data.addresses).to.have.lengthOf(1);
    expect(result.data.addresses[0].address1).to.equal('Wendenstrasse 1');
    expect(result.data.addresses[0].address2).to.equal('');
    expect(result.data.addresses[0].zip).to.equal('20537');
    expect(result.data.addresses[0].city).to.equal('Hamburg');
    expect(result.data.addresses[0].country_name).to.equal('Germany');
    expect(result.data.addresses[0].country_code).to.equal('DE');
    expect(result.data.addresses[0].default).to.equal(true);

    expect(result.data.tags).to.equal('tag1,tag2');
  });
});
