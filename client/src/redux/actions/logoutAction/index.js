export const logoutAction = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
};

export default logoutAction;
