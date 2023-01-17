import { h } from 'preact';
import { useReducer, useEffect } from 'preact/hooks';

const initialState = {
    isLoading: true,
    data: {},
    error: null,
};

function reducer(state, action) {
    const { type, payload } = action;
  
    switch (type) {
    case 'FETCH_STARTED': {
        return {
            ...state,
            isLoading: true,
        };
    }
    case 'FETCH_SUCCESS': {
        return {
            ...state,
            data: [...state.data, payload],
            isLoading: false,
        };
    }
    case 'FETCH_FAILED': {
        return {
            ...state, 
            error: payload,
            isLoading: false,
        };
    }
    default: return state;
    }
}

export default function useFetch(url) {
    const [data, dispatch] = useReducer(reducer, initialState);
    
    useEffect(() => {
        (async () => {
            dispatch({ type: 'FETCH_STARTED' });
          
            const response = await fetch(url).catch((error) => dispatch({ type: 'FETCH_FAILED', payload: error }));
           
            if (!data.error) {
                dispatch({ type: 'FETCH_SUCCESS', payload: await response.json() });   
            }
        })();
    }, []);
    
    return data;
}
