import axios from 'axios';

import { CONFIRM_REGISTER_SUCCESS, CONFIRM_REGISTER_ERROR } from '../../types';

export const confirmRegisterAction = (user) => {
    return async (dispatch) => {
        try {
            const res = await axios.post('/confirm-registration', user);
            const { data } = res;
            dispatch({ type: CONFIRM_REGISTER_SUCCESS, payload: data });
        } catch (error) {
            console.error(error);
            dispatch({ type: CONFIRM_REGISTER_ERROR, payload: {} });
        }
    };
};

export default confirmRegisterAction();
