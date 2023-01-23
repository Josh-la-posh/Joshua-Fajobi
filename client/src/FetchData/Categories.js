import { gql } from "@apollo/client";

// GET ALL CATEGORIES NAMES

export const QUERY_ALL_CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;
