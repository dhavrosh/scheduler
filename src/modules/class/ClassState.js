import { List, fromJS } from 'immutable';
import { popRoute, popAllRoutes, setSceneParams } from '../navigation/NavigationState';

const initialState = List([]);

const SAVE_CLASS = 'ClassState/SAVE_CLASS';
const REMOVE_CLASS = 'ClassState/REMOVE_CLASS';
const REMOVE_TIME = 'ClassState/REMOVE_TIME';

export function saveClassObj(obj) {
    return {
        type: SAVE_CLASS,
        payload: obj
    };
}

export function removeClassObj(id) {
    return {
        type: REMOVE_CLASS,
        payload: id
    };
}

export function saveClass(obj) {
    return dispatch => {
        dispatch(saveClassObj(obj));
        dispatch(popRoute());
        dispatch(popRoute());
    }
}

export function removeClass(id) {
    return dispatch => {
        dispatch(removeClassObj(id));
        dispatch(popRoute());
        dispatch(popRoute());
    }
}

export function removeTime(obj) {
    return dispatch => {
        dispatch(setSceneParams(obj));
        dispatch(popRoute());
    }
}

export default function classState(state = initialState, action) {
    switch (action.type) {
        case SAVE_CLASS: {
            let _state = state.toJS();
            const index = _state.findIndex(item => item.id === action.payload.id);

            if (index > -1) {
                _state[index] = action.payload;
            } else {
                _state = [..._state, action.payload];
            }

            return fromJS(_state);
        }
        case REMOVE_CLASS: {
            let _state = state.toJS();
            _state = _state.filter(item => item.id !== action.payload);

            return fromJS(_state);
        }
        default:
            return state;
    }
}
