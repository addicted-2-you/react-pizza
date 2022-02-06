import { ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({
  typePolicies: {
    Pizza: {
      keyFields: ['id', 'name'],
    },
  },
});

export default new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache,
});
