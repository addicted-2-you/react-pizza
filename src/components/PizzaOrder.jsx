import React from 'react';
import { useReactiveVar } from '@apollo/client';

import { cart } from '~/gql-client/reactive-variables';
import { getUniqueDoughOptions, getUniqueSizeOptions } from '~/utils/pizza.utils';

import PizzaOrderSwitch from './PizzaOrderSwitch';

// TODO: fix extra rerenders
function PizzaOrder(props) {
  const { pizza } = props;

  const currentCart = useReactiveVar(cart);

  const uniqueDoughOptions = React.useMemo(() => getUniqueDoughOptions(pizza.modifications), []);
  const uniqueSizeOptions = React.useMemo(() => getUniqueSizeOptions(pizza.modifications), []);

  const [checkedDoughOption, setCheckedDoughOption] = React.useState(uniqueDoughOptions[0]);
  const [checkedSizeOption, setCheckedSizeOption] = React.useState(uniqueSizeOptions[0]);

  const selectedModification = React.useMemo(
    () =>
      pizza.modifications.find(
        (modification) =>
          modification.dough === checkedDoughOption.dough &&
          modification.size === checkedSizeOption.size,
      ),
    [checkedDoughOption, checkedSizeOption],
  );

  const numberOfSamePizzasAlreadyInCart = React.useMemo(
    () =>
      currentCart.filter(
        (cartPizza) =>
          cartPizza.id === pizza.id &&
          cartPizza.selectedModification.dough === selectedModification.dough &&
          cartPizza.selectedModification.size === selectedModification.size,
      ).length,
    [currentCart, pizza, selectedModification],
  );

  const checkDoughOption = React.useCallback(
    (option) => setCheckedDoughOption(option),
    [setCheckedDoughOption],
  );

  const checkSizeOption = React.useCallback(
    (option) => setCheckedSizeOption(option),
    [setCheckedSizeOption],
  );

  const addPizzaToCart = React.useCallback(() => {
    cart([...currentCart, { ...pizza, selectedModification }]);
    window.localStorage.setItem(
      'cart',
      JSON.stringify([...currentCart, { ...pizza, selectedModification }]),
    );

    console.log([...currentCart, { ...pizza, selectedModification }]);
  }, [currentCart, pizza, selectedModification]);

  return (
    <div className="p-1 flex flex-col items-center bg-white rounded-lg">
      <img className="w-1/2" src={pizza.image} alt="pizza" />
      <h3 className="my-5 font-bold">{pizza.name}</h3>

      <div className="p-2 space-y-2 w-full bg-gray-100 rounded-lg">
        <PizzaOrderSwitch
          checkedOptionId={checkedDoughOption.id}
          options={uniqueDoughOptions}
          radioGroupName={`pizza-dough-type-${pizza.id}`}
          checkOption={checkDoughOption}
        />

        <PizzaOrderSwitch
          checkedOptionId={checkedSizeOption.id}
          options={uniqueSizeOptions}
          radioGroupName={`pizza-size-type-${pizza.id}`}
          checkOption={checkSizeOption}
        />
      </div>

      <div className="p-2 w-full flex justify-between items-center">
        <p className="text-sm font-bold">от {selectedModification.price} ₽</p>

        <button
          className="group py-1 px-2 text-yellow-500 font-semibold bg-transparent border-2 rounded-2xl border-yellow-500 cursor-pointer hover:bg-yellow-500 hover:text-white"
          type="button"
          onClick={addPizzaToCart}
        >
          + Добавить{' '}
          {numberOfSamePizzasAlreadyInCart === 0 ? null : (
            <span className="py-1 px-2 text-xs text-white rounded-full bg-yellow-500 group-hover:text-yellow-500 group-hover:bg-white">
              {numberOfSamePizzasAlreadyInCart}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default PizzaOrder;
