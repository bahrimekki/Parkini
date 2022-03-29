import { combineReducers } from "redux";
import UserReducer from "./UserReducer.js";
import BookedReducer from "./BookedReducer";
import HistoriqueReducer from "./HistoriqueReducer";
import ParkingReducer from "./ParkingReducer";
import LanguageReducer from "./LanguageReducer.js";

export default combineReducers({
    UserReducer,
    BookedReducer,
    HistoriqueReducer,
    ParkingReducer,
    LanguageReducer,
});
