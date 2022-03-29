import { Alert } from "react-native";
import axios from "axios";
import {
    //---------------parking----------------------------------
    GET_PARKING,
    PUT_PARKING,
    FAIL_PARKING,
    LOAD_PARKING,
    //---------------hystorique--------------------------------
    GET_HISTORIQUE,
    ADD_HISTORIQUE,
    FAIL_HISTORIQUE,
    LOAD_HISTORIQUE,
    //---------------booked---------------------------------------
    GET_BOOKED,
    FAIL_BOOKED,
    //------------user-------------------------------
    SIGNIN_USER,
    LOAD_USER,
    LOGIN_USER,
    FAIL_USER,
    CURRENT_USER,
    LOGOUT_USER,
} from "../Constants/action-types";
import dateFormat from "dateformat";
import configenv from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
//--------------------------------USER-----------------------------------------------

export const signin = (user, navigation) => async (dispatch) => {
    try {
        const result = await axios.post(
            configenv.API_URI + "/user/SignIn",
            user
        );
    } catch (error) {
        error.response.data.errors.map((element) =>
            Alert.alert("Alert " + element.param, element.msg, [
                {
                    text: "Cancel",
                    style: "cancel",
                },
            ])
        );
        dispatch({ type: FAIL_USER, payload: error.response.data.errors });
    }
};

export const login = (user, navigation) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        const result = await axios.post(
            configenv.API_URI + "/user/LogIn",
            user
        );
        await AsyncStorage.setItem("token", result.data.token);
        dispatch({ type: LOGIN_USER, payload: result.data });
    } catch (error) {
        error.response.data.errors.map((element) =>
            Alert.alert("Alert " + element.param, element.msg, [
                {
                    text: "Cancel",
                    style: "cancel",
                },
            ])
        );
        dispatch({ type: FAIL_USER, payload: error.response.data.errors });
    }
};

export const current = () => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        const config = {
            headers: { authorization: await AsyncStorage.getItem("token") },
        };
        const result = await axios.get(
            configenv.API_URI + "/user/current",
            config
        );
        dispatch({ type: CURRENT_USER, payload: result.data });
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.response.data.errors });
    }
};

export const logout = () => async (dispatch) => {
    console.log("logout");
    dispatch({ type: LOGOUT_USER });
};

//--------------------------------ZONES-----------------------------------------------
export const getzone = (owner) => async (dispatch) => {
    dispatch({ type: LOAD_ZONE });
    try {
        const res = await axios.post(configenv.API_URI + "/zones/get", {
            owner: owner,
        });
        dispatch({ type: GET_ZONE, payload: res.data.zone });
    } catch (error) {
        error.response.data.errors.map((element) =>
            Alert.alert("Alert " + element.param, element.msg, [
                {
                    text: "Cancel",
                    style: "cancel",
                },
            ])
        );
        dispatch({ type: FAIL_ZONES, payload: error.response.data.errors });
    }
};
//--------------------------------hystorique-----------------------------------------------
export const gethistorique = () => async (dispatch) => {
    dispatch({ type: LOAD_HISTORIQUE });
    try {
        const res = await axios.post(configenv.API_URI + "/historique/get", {
            owner: "mekkibahri15@gmail.com",
        });
        dispatch({ type: GET_HISTORIQUE, payload: res.data.historiques });
    } catch (error) {
        error.response.data.errors.map((element) =>
            Alert.alert("Alert " + element.param, element.msg, [
                {
                    text: "Cancel",
                    style: "cancel",
                },
            ])
        );
        dispatch({
            type: FAIL_HISTORIQUE,
            payload: error.response.data.errors,
        });
    }
};

export const addhistorique = (historique) => async (dispatch) => {
    try {
        const res = await axios.post(
            configenv.API_URI + "/historique/",
            historique
        );
        dispatch({ type: GET_HISTORIQUE, payload: res.data.historique });
    } catch (error) {
        error.response.data.errors.map((element) =>
            Alert.alert("Alert " + element.param, element.msg, [
                {
                    text: "Cancel",
                    style: "cancel",
                },
            ])
        );
        dispatch({
            type: FAIL_HISTORIQUE,
            payload: error.response.data.errors,
        });
    }
};

//--------------------------------parking-----------------------------------------------
export const getparking = () => async (dispatch) => {
    dispatch({ type: LOAD_PARKING });
    try {
        const res = await axios.post(configenv.API_URI + "/parking/get");
        dispatch({
            type: GET_PARKING,
            payload: res.data.parkings,
        });
    } catch (error) {
        error.response.data.errors.map((element) =>
            Alert.alert("Alert " + element.param, element.msg, [
                {
                    text: "Cancel",
                    style: "cancel",
                },
            ])
        );
        dispatch({
            type: FAIL_PARKING,
            payload: error.response.data.errors,
        });
    }
};

export const putparking = (parking) => async (dispatch) => {
    dispatch({ type: LOAD_PARKING });
    try {
        const res = await axios.put(configenv.API_URI + "/parking/", parking);
    } catch (error) {
        error.response.data.errors.map((element) =>
            Alert.alert("Alert " + element.param, element.msg, [
                {
                    text: "Cancel",
                    style: "cancel",
                },
            ])
        );
        dispatch({
            type: FAIL_PARKING,
            payload: error.response.data.errors,
        });
    }
};

//--------------------------------booked-----------------------------------------------
export const getbooked = () => async (dispatch) => {
    const owner = "mekkibahri15@gmail.com";
    try {
        const res = await axios.post(configenv.API_URI + "/booked/get", {
            owner: owner,
        });
        dispatch({ type: GET_BOOKED, payload: res.data.booked });
    } catch (error) {
        error.response.data.errors.map((element) =>
            Alert.alert("Alert " + element.param, element.msg, [
                {
                    text: "Cancel",
                    style: "cancel",
                },
            ])
        );
        dispatch({
            type: FAIL_BOOKED,
            payload: error.response.data.errors,
        });
    }
};

export const addbooked = (booked) => async (dispatch) => {
    try {
        const res = await axios.post(configenv.API_URI + "/booked/", booked);
    } catch (error) {
        error.response.data.errors.map((element) =>
            Alert.alert("Alert " + element.param, element.msg, [
                {
                    text: "Cancel",
                    style: "cancel",
                },
            ])
        );
        dispatch({
            type: FAIL_BOOKED,
            payload: error.response.data.errors,
        });
    }
};

export const putbooked = () => async (dispatch) => {
    const owner = "mekkibahri15@gmail.com";
    try {
        const res = await axios.put(configenv.API_URI + "/booked/", {
            owner: owner,
            datereservation: dateFormat(new Date(), "dd/mm/yyyy HH:MM"),
        });
    } catch (error) {
        error.response.data.errors.map((element) =>
            Alert.alert("Alert " + element.param, element.msg, [
                {
                    text: "Cancel",
                    style: "cancel",
                },
            ])
        );
        dispatch({
            type: FAIL_BOOKED,
            payload: error.response.data.errors,
        });
    }
};

export const deletebooked = () => async (dispatch) => {
    // const owner = "mekkibahri15@gmail.com";
    try {
        const res = await axios.delete(configenv.API_URI + "/booked/", {
            data: { owner: "mekkibahri15@gmail.com" },
        });
        Alert.alert("Alert ", "la reservation est annuller", [
            {
                text: "Cancel",
                style: "cancel",
            },
        ]);
    } catch (error) {
        error.response.data.errors.map((element) =>
            Alert.alert("Alert " + element.param, element.msg, [
                {
                    text: "Cancel",
                    style: "cancel",
                },
            ])
        );
        dispatch({
            type: FAIL_BOOKED,
            payload: error.response.data.errors,
        });
    }
};
