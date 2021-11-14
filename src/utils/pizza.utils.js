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