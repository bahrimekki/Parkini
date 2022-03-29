import {
    GET_PARKING,
    PUT_PARKING,
    FAIL_PARKING,
    LOAD_PARKING,
} from "../Constants/action-types";
const initialState = {
    parkings: [],
    errors: null,
    load: false,
};

export default function ParkingReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOAD_PARKING: {
            return { ...state, load: true };
        }
        case GET_PARKING: {
            return { ...state, parkings: payload, load: false };
        }
        case FAIL_PARKING: {
            return { ...state, errors: payload, load: false };
        }
        default:
            return state;
    }
}
