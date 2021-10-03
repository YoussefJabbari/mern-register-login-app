import axios from 'axios';

import {REGISTER_SUCCESS, REGISTER_ERROR } from '../../types';

export const registerAction = (user) => {
    return async (dispatch) => {
        axios.post('/register', user)
            .then(res => {
                const { data } = res;
                dispatch({ type: REGISTER_SUCCESS, payload: data });
            })
            .catch(error => {
                console.error(error);
                dispatch({ type: REGISTER_ERROR, payload: error.response.data });
            });
    };
};

export default registerAction;
