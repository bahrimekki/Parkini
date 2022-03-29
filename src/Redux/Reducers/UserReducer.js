import {
    CURRENT_USER,
    FAIL_USER,
    LOAD_USER,
    LOGIN_USER,
    LOGOUT_USER,
} from "../Constants/action-types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    user: {
        _id: "loading...",
        email: "loading...",
        name: "loading...",
        psw: "loading...",
        serialnumber: "loading...",
        typecar: "loading...",
    },
    errors: null,
    isAuth: false,
    load: false,
};

export default function UserReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOAD_USER: {
            return { ...state, load: true };
        }
        case LOGIN_USER: {
            return {
                ...state,
                user: payload.user,
                load: false,
                isAuth: true,
            };
        }
        case FAIL_USER: {
            return { ...state, errors: payload, load: false };
        }
        case CURRENT_USER: {
            return {
                ...state,
                user: payload.user,
                load: false,
                isAuth: true,
            };
        }
        case LOGOUT_USER: {
            AsyncStorage.removeItem("token");
            return {
                ...state,
                user: {},
                isAuth: false,
                load: false,
            };
        }
        default:
            return state;
    }
}
