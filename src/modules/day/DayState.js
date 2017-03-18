import { List } from 'immutable';

const initialState = List([
  'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun', 'Sat'
]);

export default function DayStateReducer(state = initialState) {
  return state;
}
