import './Login.css';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Button from "@mui/material/Button";

function Login() {
    return (
        <div className="Login">
            <h1>Register and Login app</h1>
            <TextField
                className="TextField"
                label="E-mail"
                type="email"
                required
                size="small"
                variant="standard"
            />
            <TextField
                className="TextField"
                label="Mot de passe"
                type="password"
                required
                size="small"
                variant="standard"
            />
            <Button
                className="Button"
                variant="contained"
                onClick={handleClick}>
                Register
            </Button><br />
            <div>
                <Link component={RouterLink} to={process.env.PUBLIC_URL + '/register'} underline="hover">
                    {'Not registered yet? Create your own account!'}
                </Link>
            </div>
        </div>
    );
}

const handleClick = () => {
    console.log('Login component', 'Request for login');
}

export default Login;
