import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR } from './types';

const API_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  return function(dispatch) {
    // Submit email/password to server
    axios.post(`${API_URL}/signin`, { email, password })
      .then(response => {
        // If request is good...
        // -Update state to indicate user i sauthenticated
        dispatch({ type: AUTH_USER });
        // -Save the JWT token
        localStorage.setItem('token', response.data.token);
        // -redirect to route '/feature'
        browserHistory.push('/feature');
      })
      .catch(() => {
        // If request is bad...
        // -Show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    error
  };
}