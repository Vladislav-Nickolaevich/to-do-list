import {instance, ResponseType, UserType} from "./task-api";
import {AxiosResponse} from "axios";
import {LoginDataType} from "../features/Login/Login";

export const authAPI = {
    login(data: LoginDataType) {
        return instance
            .post<ResponseType<{ userId: number }>,
                AxiosResponse<ResponseType<{ userId: number }>>,
                LoginDataType>('/auth/login', data)
    },
    me() {
        return instance
            .get<ResponseType<UserType>,
                AxiosResponse<ResponseType<UserType>>>('/auth/me')
    },
    logOut() {
        return instance
            .delete<ResponseType>('/auth/login')
    },
}