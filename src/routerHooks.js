import React from 'react';
import {useHistory, useLocation} from "react-router-dom";

const queryString = require('query-string')

/**
 * Hook to get/set query parameters. **Query param values must not be null/undefined**
 *
 * @param paramName The name of the query parameter to monitor
 * @param defaultValue The default value to use if the url query param is not currently set
 * @param pushOnHistory A boolean representing whether updates to the query parameter
 *                      should be pushed onto the browser history.
 *
 * @returns {[string, function]}
 */
export const useQueryParam = (paramName, defaultValue, pushOnHistory = true) => {
  useLocation() // Used to rerender component when parameters are updated
  const history = useHistory()
  const query = queryString.parse(window.location.search)

  const setParam = React.useCallback((value) => {
    if (!value) return // only set if value is not null/undefined

    const query = new URLSearchParams(window.location.search)
    const currentQuery = queryString.parse(window.location.search)

    if (currentQuery[paramName] === value) return // don't set if value hasn't changed

    for (const [key, value] of Object.entries(currentQuery)) {
      query.set(key, value)
    }

    query.set(paramName, value)

    if (pushOnHistory) {
      history.push({...history.location, search: query.toString()})
    } else {
      history.replace({...history.location, search: query.toString()})
    }
  }, [history, paramName, pushOnHistory]);

  React.useEffect(() => {
    if (!query[paramName]) {
      setParam(defaultValue)
    }
  }, [defaultValue, paramName, query, setParam])

  return [query[paramName], setParam]
}
