import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

function useConsumableStore(storeName, selector = (state) => state) {
    let consumableStore = window.sgd[storeName];
    const [timer, setTimer] = useState(0);
    const [state, setState] = useState({});

    useEffect(() => {
        if (!consumableStore) {
            const timerID = setInterval(() => {
                consumableStore = window.sgd[storeName];
                setTimer((prev) => prev + 1);
                if (consumableStore) clearInterval(timerID);
            }, 500);

            return;
        }

        consumableStore = window.sgd[storeName];
        setState(selector(consumableStore.getState()));
        consumableStore?.subscribe((storeState) => setState(selector(storeState)));
    }, [timer]);

    return state;
}

export useConsumableStore;
