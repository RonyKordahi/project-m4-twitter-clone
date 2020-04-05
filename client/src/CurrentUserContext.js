import React, {useReducer} from 'react'

export const CurrentUserContext = React.createContext();

const initialState = {
    currentUser: null,
    status: "loading",
    error: null,
}

function reducer(state, action) {
    switch(action.type) {
        case "first-load": {
            return {
                ...initialState
            }
        }

        case "loaded": {
            return {
                ...state,
                currentUser: action.handle,
                status: "idle"
            }
        }

        case "error": {
            return {
                ...state,
                error: true
            }
        }

        default:
            throw new Error("Something broke")
    }
}

export const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const firstUserLoad = () => {
        dispatch({
            type: "first-load"
        })
    }

    const userLoaded = (data) => {
        dispatch({
            ...data,
            type: "loaded"
        })
    }

    const catchError = () => {
        dispatch({
            type: "error"
        })
    }

    return <CurrentUserContext.Provider value={{state, actions: {firstUserLoad, userLoaded, catchError}}}>
        {children}
        </CurrentUserContext.Provider>
}

export default CurrentUserContext
