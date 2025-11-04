import { useEffect, useState } from "react";

let globalState = {};
let listeners = [];
let actions = {}

export const useStore = (shouldListen = true) => {
    const [_, setStore] = useState(globalState);

    const dispatch = (actionId, payload) => {
        const newStore = actions[actionId](globalState, payload);
        globalState = { ...globalState, ...newStore };

        listeners.forEach(listener => listener(globalState));
    }

    useEffect(() => {
        if (shouldListen) {
            listeners.push(setStore);
        }

        return () => {
            if (shouldListen) {
                listeners = listeners.filter(listener => listener !== setStore);
            }
        }
    }, [shouldListen]);

    return [globalState, dispatch];
}

export const initStore = (initialActions, initialStore) => {
    if (initialStore) {
        globalState = { ...globalState, ...initialStore }
    }

    actions = { ...actions, ...initialActions }
}
