import {GET_STUDENTS, GET_STUDENT} from '../constants';
import axios from 'axios';

export const retrieveStudents = students => ({
  type: GET_STUDENTS,
  students
});

export const retrieveStudent = (student, campus) => ({
  type: GET_STUDENT,
  student,
  campus
});

export const getStudentById = studentId => {
  return dispatch => {
    Promise
      .all([
        axios.get(`/api/students/${studentId}`),
        axios.get(`/api/students/${studentId}/campus`),
      ])
      .then(results => results.map(r => r.data))
      .then(results => {
        dispatch(retrieveStudent(...results));
      });
  };
};