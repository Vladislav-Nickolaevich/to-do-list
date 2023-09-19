import {
    SetErrorACType,
    setInitialisingAC,
    SetInitialisingACType,
    setStatusAC,
    SetStatusACType
} from "../../app/app-reducer";
import {ResultCodes} from "../../api/task-api";
import {handlerServerNetworkError, handleServerAppError} from "../../utils/util-error";
import {authAPI} from "../../api/auth-api";
import {LoginDataType} from "./Login";
import {Dispatch} from "redux";

type InitialStateType = typeof initialState
const initialState = {
    isLoggedIn: false
}


export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {
                ...state,
                isLoggedIn: action.value
            }
        default:
            return state
    }
}

export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export const loginTC = (data: LoginDataType)=> async (dispatch: Dispatch<ActionType>) => {
    dispatch(setStatusAC('loading'))
    try {
        const result = await authAPI.login(data)
        if (result.data.resultCode === ResultCodes.OK) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setStatusAC('succeeded'))
        } else {
            handleServerAppError(result.data, dispatch)
        }
    } catch (e) {
        let error = e as { message: string }
        handlerServerNetworkError(dispatch, error.message)
    }

}

export const meTC = ()=> async (dispatch: Dispatch<ActionType>) => {
    dispatch(setStatusAC('loading'))
    try {
        const result = await authAPI.me()
        if (result.data.resultCode === ResultCodes.OK) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setStatusAC('succeeded'))
        } else {
            handleServerAppError(result.data, dispatch)
        }
    } catch (e) {
        let error = e as { message: string }
        handlerServerNetworkError(dispatch, error.message)
    }
    finally {
        dispatch(setInitialisingAC(true))
    }
}

export const logOutTC = ()=> async (dispatch: Dispatch<ActionType>) => {
    dispatch(setStatusAC('loading'))
    try {
        const result = await authAPI.logOut()
        if (result.data.resultCode === ResultCodes.OK) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setStatusAC('succeeded'))
        } else {
            handleServerAppError(result.data, dispatch)
        }
    } catch (e) {
        let error = e as { message: string }
        handlerServerNetworkError(dispatch, error.message)
    }

}

type ActionType = ReturnType<typeof setIsLoggedInAC> | SetStatusACType | SetErrorACType | SetInitialisingACType