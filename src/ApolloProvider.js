import React from "react";

import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {ApolloProvider as Apollo} from '@apollo/client';
import {setContext} from "@apollo/client/link/context";

/**
 *  Injects children with Apollo Client
 */
export const ApolloProvider = ({children}) => {
  // Memoize client to avoid rerenders on children change
  const client = React.useMemo(() => {

    const httpLink = createHttpLink({
      uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    });

    const authLink = setContext((_, { headers }) => {
      const token = 'oiab7YSbCD8XFjKOEGtYihSFmc28vYlg'
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        }
      }
    });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache({
        typePolicies: {
          OrderUpdates: {
            keyFields: []
          },
          RequirementUpdates: {
            keyFields: []
          },
          RawGameUpdates: {
            keyFields: []
          }
        }
      })
    });
  }, []);

  return (
    <Apollo client={client}>
      {children}
    </Apollo>
  );
};
