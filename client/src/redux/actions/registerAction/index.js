import { REGISTER_SUCCESS, REGISTER_ERROR } from '../../types';
import axios from 'axios';

export const registerAction = (user) => {
    return async (dispatch) => {
        try {
            const res = await axios.post('/register', user);
            const { data } = res;
            dispatch({ type: REGISTER_SUCCESS, payload: data });
        } catch (error) {
            console.error(error);
            dispatch({ type: REGISTER_ERROR, payload: {} });
        }
    };
};

export default registerAction();
