import {
    GET_STUDENTS,
    GET_STUDENT
} from '../constants';

const initialStudentState = {
  selected: {},
  list: []
};

export default function (state = initialStudentState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case GET_STUDENTS:
      newState.list = action.students;
      break;

    case GET_STUDENT:
      newState.selected = action.student;
      break;

    default:
      return state;

  }

  return newState;

}