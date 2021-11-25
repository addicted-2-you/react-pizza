import { gql } from '@apollo/client';

export const GET_ALL_PIZZAS = gql`
  query GetPizzas {
    pizzas {
      id
      name
      image
      popularity
      types
      modifications {
        id
        dough
        size
        price
        pizzasIds
      }
    }
  }
`;
