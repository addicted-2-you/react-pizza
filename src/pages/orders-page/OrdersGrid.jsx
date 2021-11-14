import React from 'react';
import { useQuery } from '@apollo/client';

// gql
import { GET_ALL_PIZZAS } from '~/gql-client/pizza.queries';

// components
import PizzaOrder from '~/components/PizzaOrder';

function OrdersGrid() {
  const { data, loading, error } = useQuery(GET_ALL_PIZZAS);

  if (loading) {
    return <p className="italic">Loading!</p>;
  }

  if (error) {
    return <p className="text-red-600 font-bold">Error!</p>;
  }

  return (
    <div className="p-5 grid grid-cols-4 gap-5 rounded-lg">
      {data.pizzas.map((pizza) => (
        <PizzaOrder key={pizza.id} pizza={pizza} />
      ))}
    </div>
  );
}

export default OrdersGrid;
