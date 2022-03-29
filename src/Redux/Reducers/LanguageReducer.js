import { GET_LANGUAGE } from "../Constants/action-types";
const initialState = {
    language: 0,
};

export default function LanguageReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_LANGUAGE: {
            return { ...state, language: payload };
        }
        default:
            return state;
    }
}
