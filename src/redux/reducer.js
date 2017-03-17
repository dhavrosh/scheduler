import { Map, fromJS } from 'immutable';
import { loop, combineReducers } from 'redux-loop';
import NavigationStateReducer from '../modules/navigation/NavigationState';
import SessionStateReducer, {RESET_STATE} from '../modules/session/SessionState';

/*import AmplitudeStateReducer from '../modules/dashboard/DashboardState';
import DecibelPickerStateReducer from '../modules/decibelPicker/DecibelPickerState';
import LimitsStateReducer from '../modules/limits/LimitsState';*/

const reducers = {
    /*dashboard: AmplitudeStateReducer,
    decibels: DecibelPickerStateReducer,
    limits: LimitsStateReducer,*/
    navigationState: NavigationStateReducer,
    session: SessionStateReducer
};

// initial state, accessor and mutator for supporting root-level
// immutable data with redux-loop reducer combinator
const immutableStateContainer = Map();
const getImmutable = (child, key) => child ? child.get(key) : void 0;
const setImmutable = (child, key, value) => child.set(key, value);

const namespacedReducer = combineReducers(
    reducers,
    immutableStateContainer,
    getImmutable,
    setImmutable
);

export default function mainReducer(state, action) {
    const [nextState, effects] = action.type === RESET_STATE
        ? namespacedReducer(action.payload, action)
        : namespacedReducer(state || void 0, action);

    // enforce the state is immutable
    return loop(fromJS(nextState), effects);
}
