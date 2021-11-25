import React from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';

// gql
import { orderBy, pizzasFilterType } from '~/gql-client/reactive-variables';
import { GET_ALL_PIZZAS } from '~/gql-client/pizza.queries';

// components
import PizzaOrder from '~/components/PizzaOrder';

// utils
import { getPizzaAveragePrice } from '~/utils/pizza.utils';

function OrdersGrid() {
  const { data, loading, error } = useQuery(GET_ALL_PIZZAS);

  const currentOrderBy = useReactiveVar(orderBy);
  const currentPizzasFilterType = useReactiveVar(pizzasFilterType);

  const orderedPizzas = React.useMemo(() => {
    if (data) {
      const { pizzas = [] } = data;
      const pizzasCopy = [...pizzas];
      switch (currentOrderBy) {
        case 'popularity': {
          return pizzasCopy.sort((pizza1, pizza2) => pizza2.popularity - pizza1.popularity);
        }

        case 'price': {
          return pizzasCopy.sort(
            (pizza1, pizza2) => getPizzaAveragePrice(pizza2) - getPizzaAveragePrice(pizza1),
          );
        }

        case 'alphabet': {
          return pizzasCopy.sort((pizza1, pizza2) => {
            if (pizza2.name > pizza1.name) {
              return -1;
            }

            if (pizza2.name < pizza1.name) {
              return 1;
            }

            return 0;
          });
        }

        default: {
          throw new Error('Wrong order type!');
        }
      }
    }

    return [];
  }, [data, currentOrderBy]);

  const filteredPizzas = React.useMemo(() => {
    if (currentPizzasFilterType === 'all') {
      return orderedPizzas;
    }

    return orderedPizzas.filter((pizza) => pizza.types.includes(currentPizzasFilterType));
  }, [orderedPizzas, currentPizzasFilterType]);

  if (loading) {
    return <p className="italic">Loading!</p>;
  }

  if (error) {
    return <p className="text-red-600 font-bold">Error!</p>;
  }

  return (
    <div className="p-5 grid grid-cols-4 gap-5 rounded-lg">
      {filteredPizzas.map((pizza) => (
        <PizzaOrder key={pizza.id} pizza={pizza} />
      ))}
    </div>
  );
}

export default OrdersGrid;
