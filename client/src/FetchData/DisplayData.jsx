import { gql } from "@apollo/client";

//ALL CATEGORIES

export const QUERY_ALL_CATEGORIES = gql`
    query GetAllCategories {
        categories {
        name
        products {
            id
            name
            inStock
            gallery
            description
            category
            attributes {
            id
            name
            type
            items {
                id
                value
                displayValue
            }
            }
            prices {
            currency {
                label
                symbol
            }
            amount
            }
            brand
        }
    }
  }
`

// A SINGLE PRODUCT

// export const QUERY_PRODUCT = gql`
//   query GetProduct($id: String!) {
//     product (id: $id) {
//       id
//       name
//       inStock
//       gallery
//       description
//       category
//       attributes {
//         id
//         name
//         type
//         items {
//           id
//           value
//         }
//       }
//       prices {
//         currency {
//           label
//           symbol
//         }
//         amount
//       }
//       brand
    
//     }
    
//   }
// `


// // FOR CURRENCIES

// export const QUERY_CURRENCIES = gql`
//   query GetCurrencies {
//       currencies {
//           label
//           symbol
//       }
//   }`