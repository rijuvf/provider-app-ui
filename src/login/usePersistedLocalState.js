import { useState, useEffect } from 'react';
import { jsonDateParser } from 'json-date-parser';

/**
 * Custom hook for persisting the configuration in local storage
 * @param {string} key the local storage key
 * @param {object} defaultValue the default configuration
 */
const usePersistedLocalState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    const persistedState = localStorage.getItem(key);
    return persistedState
      ? JSON.parse(persistedState, jsonDateParser)
      : defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
};

export default usePersistedLocalState;
