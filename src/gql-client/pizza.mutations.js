import { gql } from '@apollo/client';

// input OrderedPizzasInput {
//   dough: String!
//   size: Int!
//   price: Float!
//   amount: Int!
//   pizzaName: String!
// }

// input OrderInput {
//   totalPrice: Float!
//   totalAmount: Int!
//   orderedPizzas: [OrderedPizzasInput!]!
// }

export const CREATE_ORDER = gql`
  mutation CreateOrder($order: OrderInput!) {
    createOrder(order: $order) {
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
