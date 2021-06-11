# IKEA Others Also Viewed Service

> This service provides a list of similar products for each product.

## Related Projects

  - https://github.com/HR-SDC-Bridge/calvin-about
  - https://github.com/HR-SDC-Bridge/grant-product-size-
  - https://github.com/HR-SDC-Bridge/melissa-reviews

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

### API Endpoints
- CREATE

  Type | Endpoint URL | Behavior
  --- | --- | ---
  POST | '/similar-products-by-views' | Creates a new list of similar products for the next largest product ID. The request body should be a JSON object with the following structure: {"similar_items": [productID1, productID2]}. The "similar_items" property value is an array of integers that represent the product ID's for the similar products.
  GET | '/similar-products-by-views/:id' | Gets similar products for a specific product ID. The ":id" parameter should equal the product ID you want to get information for.
  PUT | '/similar-products-by-views/:id' | Updates an existing product's list of similar products. The ":id" parameter should equal the product ID you want to update and the request body should be a JSON object with the following structure: {"similarItems": [productID1, productID2]}. The "similarItems" property value is an array of integers that represent the product ID's for the similar products that will replace the existing value.
  DELETE | '/similar-products-by-views/:id' | Deletes the entire record of similar items for a given product ID (represented by the ":id" parameter).

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```


# ubuntu server - how to start postgres
/usr/lib/postgresql/10/bin/pg_ctl -D /var/lib/postgresql/10/main -l logfile start