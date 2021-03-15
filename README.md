# ![LOGO](logo.png) Shopify Admin API OIH Connector

![alpha](https://img.shields.io/badge/Status-Alpha-yellow.svg)

## Description

A generated OIH connector for the Shopify Admin API API (version 2020-10).

Generated from: https://raw.githubusercontent.com/allengrant/shopify_openapi/master/shopify_openapi.yaml<br/>
Generated at: 2021-03-09T15:48:32+01:00

## API Description

The REST Admin API lets you build apps and other integrations for the Shopify admin.<br/>

## Authorization

This API does require Oauth2 authorization.

## Actions

### Upserts a customer.

*Tags:* `upsert_customers`

### Creates a customer.
> https://shopify.dev/docs/admin-api/rest/reference/customers/customer#create-2020-01<br/>

*Tags:* `customers` `customer` `customers/customer`

### Updates a customer.
> https://shopify.dev/docs/admin-api/rest/reference/customers/customer#update-2020-01<br/>

*Tags:* `customers` `customer` `customers/customer`

#### Input Parameters
* `customer_id` - _required_ - customer_id<br/>

### Deletes a customer. A customer can't be deleted if they have existing orders.
> https://shopify.dev/docs/admin-api/rest/reference/customers/customer#destroy-2020-01<br/>

*Tags:* `customers` `customer` `customers/customer`

## Triggers


### Retrieves a list of customers. Note: As of version 2019-10, this endpoint implements pagination by using links that are provided in the response header. Sending the page parameter will return an error. To learn more, see Making requests to paginated REST Admin API endpoints.
> https://shopify.dev/docs/admin-api/rest/reference/customers/customer#index-2020-01<br/>

*Tags:* `get_customers`

#### Input Parameters
* `ids` - _optional_ - Restrict results to customers specified by a comma-separated list of IDs.<br/>
* `since_id` - _optional_ - Restrict results to those after the specified ID.<br/>
* `created_at_min` - _optional_ - Show customers created after a specified date.(format: 2014-04-25T16:15:47-04:00)<br/>
* `created_at_max` - _optional_ - Show customers created before a specified date.(format: 2014-04-25T16:15:47-04:00)<br/>
* `updated_at_min` - _optional_ - Show customers last updated after a specified date.(format: 2014-04-25T16:15:47-04:00)<br/>
* `updated_at_max` - _optional_ - Show customers last updated before a specified date.(format: 2014-04-25T16:15:47-04:00)<br/>
* `limit` - _optional_ - The maximum number of results to show.<br/>
                  (default: 50, maximum: 250)<br/>
* `fields` - _optional_ - Show only certain fields, specified by a comma-separated list of field names.<br/>

### Retrieves a single customer.
> https://shopify.dev/docs/admin-api/rest/reference/customers/customer#show-2020-01<br/>

*Tags:* `customers` `customer` `customers/customer`

#### Input Parameters
* `customer_id` - _required_ - customer_id<br/>
* `fields` - _optional_ - Show only certain fields, specified by a comma-separated list of field names.<br/>


## License

: shopify-connector<br/>
                    <br/>

All files of this connector are licensed under the Apache 2.0 License. For details
see the file LICENSE on the toplevel directory.
