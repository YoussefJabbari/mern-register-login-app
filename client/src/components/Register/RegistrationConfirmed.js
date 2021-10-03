import { Alert, AlertTitle } from '@mui/material';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Chip from '@mui/material/Chip';

import './Register.css';
import { confirmRegisterAction } from '../../redux/actions';

const RegistrationConfirmed = (props) => {
    const { confirmRegistrationState, confirmRegistration } = props;
    const { id } = useParams();

    confirmRegistration({id: id});

    return (
        <div className="Register">
            <h2>Register and Login App</h2>

            <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                Your account is activated, you can login now using your email and password!
            </Alert>

            <Chip
                label="Login page"
                className="Button"
                clickable={true}
                component={Link}
                to="/login"
                color="primary"
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        confirmRegistrationState: state.confirmRegistration
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        confirmRegistration: (user) => {
            dispatch(confirmRegisterAction(user));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationConfirmed);
