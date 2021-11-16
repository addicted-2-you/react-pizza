export const getUniqueDoughOptions = (modifications) =>
  modifications.reduce(
    (acc, item) =>
      acc.find((accItem) => accItem.dough === item.dough)
        ? acc
        : [...acc, { ...item, name: item.dough }],
    [],
  );

export const getUniqueSizeOptions = (modifications) =>
  modifications.reduce(
    (acc, item) =>
      acc.find((accItem) => accItem.size === item.size)
        ? acc
        : [...acc, { ...item, name: `${item.size} см.` }],
    [],
  );

export const pizzaSameOrderComparer = ({ cartPizza, id, dough, size }) =>
  cartPizza.id === id &&
  cartPizza.selectedModification.dough === dough &&
  cartPizza.selectedModification.size === size;

export const transformToOrderedPizzasInput = ({
  amount,
  name,
  selectedModification: { dough, size, price },
}) => ({
  dough,
  price,
  pizzaName: name,
  size: parseInt(size, 10),
  amount: parseInt(amount, 10),
});
