import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query getProductById($pdpId: String!) {
    product(id: $pdpId) {
      id
      brand
      name
      gallery
      inStock
      prices {
        currency {
          symbol
        }
        amount
      }
      category
      description
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
    }
  }
`;
