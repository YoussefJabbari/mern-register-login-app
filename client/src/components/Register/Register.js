import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Alert from '@mui/material/Alert';

import './Register.css';
import { registerAction } from '../../redux/actions';

const Register = (props) => {
    const { registerState, register } = props;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    if (localStorage.getItem('jwtToken')) {
        return <Redirect to="/" />;
    }

    return (
        <div className="Register">
            <h2>Register and Login app</h2>
            <h3>Create your own account</h3>

            { registerState.errorMessage &&
            <Alert severity="error">
                { registerState.errorMessage }
            </Alert>
            }

            { registerState.userRegistered &&
            <Alert severity="success">
                User registered! An email has been sent for confirmation!
            </Alert>
            }

            <TextField
                className="TextField"
                label="First name"
                required
                size="small"
                variant="standard"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
                className="TextField"
                label="Last name"
                required
                size="small"
                variant="standard"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
                className="TextField"
                label="Email"
                type="email"
                required
                size="small"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                className="TextField"
                label="Password"
                type="password"
                required
                size="small"
                variant="standard"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
                className="TextField"
                label="Password confirmation"
                type="password"
                required
                size="small"
                variant="standard"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <Button
                className="Button"
                variant="contained"
                onClick={() => {
                    register({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: password,
                        passwordConfirmation: passwordConfirmation
                    })
                }}
            >
                Register
            </Button><br />
            <div>
                <Link component={RouterLink} to={process.env.PUBLIC_URL + '/login'} underline="hover">
                    {'Already registered ? Login page here!'}
                </Link>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        registerState: state.register
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        register: (user) => {
            dispatch(registerAction(user));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
