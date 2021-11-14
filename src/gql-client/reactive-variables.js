import { makeVar } from '@apollo/client';

// export const cart = makeVar([
//   {
//     id: 'dcc4dc00-7ba7-45bb-a393-b4567cb44f60',
//     image: 'http://localhost:3001/images/pepperoni.png',
//     name: 'Пепперони',
//     popularity: 9,
//     selectedModification: {
//       id: 'b51b36d2-579d-4e50-9364-a1886891350f',
//       price: 7.99,
//       size: 26,
//       dough: 'тонкое',
//     },
//   },

//   {
//     id: 'dcc4dc00-7ba7-45bb-a393-b4567cb44f60',
//     image: 'http://localhost:3001/images/pepperoni.png',
//     name: 'Пепперони',
//     popularity: 9,
//     selectedModification: {
//       id: 'b51b36d2-579d-4e50-9364-a1886891350f',
//       price: 7.99,
//       size: 26,
//       dough: 'тонкое',
//     },
//   },

//   {
//     id: 'dcc4dc00-7ba7-45bb-a393-b4567cb44f60',
//     image: 'http://localhost:3001/images/pepperoni.png',
//     name: 'Пепперони',
//     popularity: 9,
//     selectedModification: {
//       id: 'b51b36d2-579d-4e50-9364-a1886891350f',
//       price: 7.99,
//       size: 26,
//       dough: 'тонкое',
//     },
//   },
// ]);

export const cart = makeVar(
  window.localStorage.getItem('cart') ? JSON.parse(window.localStorage.getItem('cart')) : [],
);
