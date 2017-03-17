import { Map } from 'immutable';
import { loop, Effects } from 'redux-loop';

const initialState = Map({
  loading: false,
  loaded: false
});

const LOAD = 'NavigationState/LOAD';

export function load(amplitude) {
  return {
    type: LOAD,
    payload: amplitude
  };
}

export default function DashboardStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return state;
    default:
      return state;
  }
}
