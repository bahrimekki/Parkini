import {
    GET_BOOKED,
    PUT_BOOKED,
    FAIL_BOOKED,
    LOAD_BOOKED,
} from "../Constants/action-types";
const initialState = {
    bookeds: [
        {
            Parking: "loading...",
            _id: "loading...",
            datereservation: "loading...",
            etat: "loading...",
            owner: "loading...",
            period: "loading...",
            price: "loading...",
        },
    ],
    errors: null,
    load: false,
};

export default function BookedReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOAD_BOOKED: {
            return { ...state, load: true };
        }
        case GET_BOOKED: {
            return { ...state, bookeds: payload, load: false };
        }
        case FAIL_BOOKED: {
            return { ...state, errors: payload, load: false };
        }
        default:
            return state;
    }
}
