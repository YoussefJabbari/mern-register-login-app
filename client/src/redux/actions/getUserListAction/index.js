import axios from 'axios';

import { GET_USER_LIST_SUCCESS, GET_USER_LIST_ERROR } from '../../types';

export const getUserListAction = () => {
    return async (dispatch) => {
        axios.get('/users/user-list', {headers: {'Authorization': localStorage.getItem('jwtToken')}})
            .then(res => {
                const { data } = res;
                dispatch({ type: GET_USER_LIST_SUCCESS, payload: data });
            })
            .catch(error => {
                console.error(error);
                dispatch({ type: GET_USER_LIST_ERROR, payload: {} });
            });
    };
};

export default getUserListAction;
