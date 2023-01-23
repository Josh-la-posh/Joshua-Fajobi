import { gql } from "@apollo/client";

export const QUERY_CURRENCIES = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;
