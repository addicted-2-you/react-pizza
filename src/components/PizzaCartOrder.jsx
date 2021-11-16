import React from 'react';
import { useReactiveVar } from '@apollo/client';

import { cart } from '~/gql-client/reactive-variables';

import { pizzaSameOrderComparer } from '~/utils/pizza.utils';

function PizzaCartOrder(props) {
  const { pizzaOrder } = props;

  const currentCart = useReactiveVar(cart);

  function incrementCartOrder() {
    const modifiedCart = currentCart.map((cartPizza) => {
      if (
        pizzaSameOrderComparer({
          cartPizza,
          id: pizzaOrder.id,
          dough: pizzaOrder.selectedModification.dough,
          size: pizzaOrder.selectedModification.size,
        })
      ) {
        return { ...cartPizza, amount: cartPizza.amount + 1 };
      }

      return cartPizza;
    });

    cart(modifiedCart);
    window.localStorage.setItem('cart', JSON.stringify(modifiedCart));
  }

  function decrementCartOrder() {
    const modifiedCart = currentCart.map((cartPizza) => {
      if (
        pizzaSameOrderComparer({
          cartPizza,
          id: pizzaOrder.id,
          dough: pizzaOrder.selectedModification.dough,
          size: pizzaOrder.selectedModification.size,
        })
      ) {
        if (cartPizza.amount > 0) {
          return { ...cartPizza, amount: cartPizza.amount - 1 };
        }
      }

      return cartPizza;
    });

    cart(modifiedCart);
    window.localStorage.setItem('cart', JSON.stringify(modifiedCart));
  }

  function deleteItemFromCart() {
    const modifiedCart = currentCart.filter(
      (cartPizza) =>
        !pizzaSameOrderComparer({
          cartPizza,
          id: pizzaOrder.id,
          dough: pizzaOrder.selectedModification.dough,
          size: pizzaOrder.selectedModification.size,
        }),
    );

    cart(modifiedCart);
    window.localStorage.setItem('cart', JSON.stringify(modifiedCart));
  }

  return (
    <tr className="w-full border-b-2 border-gray-200">
      <td>
        <img className="h-20" src={pizzaOrder.image} alt="pizza" />
      </td>

      <td>
        <p className="text-xl font-semibold">{pizzaOrder.name}</p>

        <p className="text-l text-gray-500">
          {pizzaOrder.selectedModification.dough}, {pizzaOrder.selectedModification.size}
        </p>
      </td>

      <td>
        <div className="m-auto w-2/3 flex justify-between items-center">
          <button
            className={`h-7 w-7 font-bold border-2 rounded-full  ${
              pizzaOrder.amount > 0
                ? 'text-yellow-500 border-yellow-500 cursor-pointer hover:bg-yellow-500 hover:text-white'
                : 'text-gray-300 border-gray-300 cursor-default'
            }`}
            type="button"
            onClick={decrementCartOrder}
          >
            -
          </button>

          <p className="mx-3">{pizzaOrder.amount}</p>

          <button
            className="h-7 w-7 text-yellow-500 font-bold border-2 border-yellow-500 rounded-full cursor-pointer hover:bg-yellow-500 hover:text-white"
            type="button"
            onClick={incrementCartOrder}
          >
            +
          </button>
        </div>
      </td>

      <td>
        <p className="text-xl font-bold text-center">
          {(pizzaOrder.amount * pizzaOrder.selectedModification.price).toFixed(2)} ₽
        </p>
      </td>

      <td>
        <button
          className="h-9 w-9 text-gray-400 border-2 border-gray-400 rounded-full cursor-pointer hover:bg-gray-400 hover:text-white"
          type="button"
          onClick={deleteItemFromCart}
        >
          x
        </button>
      </td>
    </tr>
  );
}

export default PizzaCartOrder;
