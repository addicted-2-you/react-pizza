import { makeVar } from '@apollo/client';

export const cart = makeVar(
  window.localStorage.getItem('cart') ? JSON.parse(window.localStorage.getItem('cart')) : [],
);

export const orderBy = makeVar('popularity');
