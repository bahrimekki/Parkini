import {
    GET_HISTORIQUE,
    ADD_HISTORIQUE,
    FAIL_HISTORIQUE,
    LOAD_HISTORIQUE,
} from "../Constants/action-types";
const initialState = {
    historique: [
        {
            parking: "loading...",
            period: "loading...",
            datepark: "loading...",
            owner: "loading...",
            payed: "loading...",
        },
    ],
    errors: null,
    load: false,
};

export default function HistoriqueReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOAD_HISTORIQUE: {
            return { ...state, load: true };
        }
        case GET_HISTORIQUE: {
            return { ...state, historique: payload, load: false };
        }
        case FAIL_HISTORIQUE: {
            return { ...state, errors: payload, load: false };
        }
        default:
            return state;
    }
}
