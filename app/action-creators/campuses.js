import {GET_CAMPUSES, GET_CAMPUS} from '../constants';
import axios from 'axios';

export const retrieveCampuses = campuses => ({
  type: GET_CAMPUSES,
  campuses
});

export const retrieveCampus = (campus, students) => ({
  type: GET_CAMPUS,
  campus,
  students
});

export const getCampusById = campusId => {               //these go back to our main route page eventually for an onEnter the id ones 
  return dispatch => {
    Promise
      .all([
        axios.get(`/api/campuses/${campusId}`),
        axios.get(`/api/campuses/${campusId}/students`),    // remember to make routes to these
      ])
      .then(results => results.map(r => r.data))
      .then(results => {
        dispatch(retrieveCampus(...results));    //come back and console log these to see what they are
      });
  };
};

//use plural here because campus has many students where as student only has one campus.