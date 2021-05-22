import * as React from 'react';
import {createContext, memo, useContext, useReducer} from 'react';
import {actions, reducer} from "../../lib/reducer";
import {initialState} from "../../lib/state";

const appContext = createContext({
    state: {}, dispatch: () => { }, actions: {}
});

const AppContext = memo(({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState, () => ({...initialState}));

    return (
        <appContext.Provider value={{state, dispatch, actions }}>
            { children }
        </appContext.Provider>
    );
});

export const useAppContext = () => useContext(appContext);

export default AppContext;