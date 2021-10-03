import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { LOGIN_SUCCESS, LOGIN_ERROR } from '../../types';

export const loginAction = (user) => {
    return async (dispatch) => {
        axios.post('/login', user)
            .then(res => {
                // Save token at localStorage
                const { token } = res.data;
                localStorage.setItem('jwtToken', token);

                // Decode token to get user data
                const decoded = jwt_decode(token);
                localStorage.setItem('userId', decoded.id);
                localStorage.setItem('userName', decoded.name);
                dispatch({ type: LOGIN_SUCCESS, payload: decoded });
            })
            .catch(error => {
                console.error(error);
                dispatch({ type: LOGIN_ERROR, payload: error.response.data });
            });
    };
};

export default loginAction;
