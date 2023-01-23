import { gql } from "@apollo/client";

export const QUERY_ALL_PRODUCTS = gql`
  query getProductsByCategory($category: String!) {
    category(input: { title: $category }) {
      products {
        id
        name
        brand
        gallery
        inStock
        prices {
          currency {
            symbol
          }
          amount
        }
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
  }
`;
