import {setErrorAC, setStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/task-api";



export const handlerServerNetworkError = (dispatch: Dispatch, error:string) => {
    dispatch(setErrorAC(error))
    dispatch(setStatusAC('failed'))
}

export const handleServerAppError = (data: ResponseType, dispatch: Dispatch) => {
    const error = data.messages[0]
    if(error){
        dispatch(setErrorAC(error))
    } else{
        dispatch(setErrorAC('Some error'))
    }
    dispatch(setStatusAC('failed'))
}