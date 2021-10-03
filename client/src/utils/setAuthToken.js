import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        // Apply Authorization token to every request if authenticated
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        // Delete Authorization header
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;