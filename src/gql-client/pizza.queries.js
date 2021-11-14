import { gql } from '@apollo/client';

export const GET_ALL_PIZZAS = gql`
  query GetPizzas {
    pizzas {
      id
      name
      image
      popularity
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
