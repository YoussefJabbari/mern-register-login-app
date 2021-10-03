import TextField from '@mui/material/TextField';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import { useState } from 'react';
import { Redirect } from 'react-router';
import Alert from '@mui/material/Alert';

import './Login.css';
import { loginAction } from '../../redux/actions';

const Login = (props) => {
    const { loginState, login } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (localStorage.getItem('jwtToken') && loginState.isAuthenticated) {
        return <Redirect to="/" />;
    }

    return (
        <div className="Login">
            <h2>Register and Login app</h2>
            <h3>Connect to your space</h3>

            {loginState.errorMessage &&
            <Alert severity="error">
                {loginState.errorMessage}
            </Alert>
            }

            <TextField
                className="TextField"
                label="E-mail"
                type="email"
                required
                size="small"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                className="TextField"
                label="Mot de passe"
                type="password"
                required
                size="small"
                variant="standard"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                className="Button"
                variant="contained"
                onClick={() => {
                    login({
                        email: email,
                        password: password
                    })
                }}
            >
                Login
            </Button><br />
            <div>
                <Link component={RouterLink} to={process.env.PUBLIC_URL + '/register'} underline="hover">
                    {'Not registered yet ? Create your own account!'}
                </Link>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        loginState: state.login
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => {
            dispatch(loginAction(user));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
