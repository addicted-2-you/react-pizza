import { gql } from 'apollo-boost';

export const GET_ALL_ORDERS = gql`
  query GetOrders {
    orders {
      id
      totalPrice
      totalAmount
      orderedPizzas {
        dough
        size
        price
        amount
        pizzaName
      }
    }
  }
`;
