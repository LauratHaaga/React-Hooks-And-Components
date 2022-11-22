import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

function useStore(store, selector = (state) => state) {
  const [state, setState] = useState(selector(store.getState()));
  
  const handleSubscribe = (storeState) => setState(selector(storeState));
  
  useEffect(() => store.subscribe(handleSubscribe));
  
  return state;
}

export useStore;
