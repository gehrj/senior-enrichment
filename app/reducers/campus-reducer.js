import {
    GET_CAMPUSES,
    GET_CAMPUS
} from '../constants';

const initialCampusState = {
  selected: {},
  list: []
};

export default function (state = initialCampusState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case GET_CAMPUSES:
      newState.list = action.campuses;
      break;

    case GET_CAMPUS:
      newState.selected = action.campus;
      break;

    default:
      return state;

  }

  return newState;

}