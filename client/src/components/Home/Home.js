import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Fab from '@mui/material/Fab';
import LogoutIcon from '@mui/icons-material/Logout';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { useState } from 'react';
import Moment from 'react-moment';

import './Home.css';
import { getUserListAction } from '../../redux/actions/getUserListAction';
import { logoutAction } from '../../redux/actions/logoutAction';

const Home = (props) => {
    const { userListState, getUserList } = props;

    const [logout, setLogout] = useState();

    if (!localStorage.getItem('jwtToken')) {
        return <Redirect to="/login" />;
    }

    if (!userListState.requestSent) {
        getUserList();
        return <div>Loading...</div>;
    }

    return (
        <div className="Home">
            <h1>Welcome {localStorage.getItem('userName')}</h1>

            <Fab
                style={{
                    position: 'absolute',
                    bottom: 35,
                    right: 50,
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 10,
                    paddingBottom: 10
                }}
                size="small"
                variant="extended"
                color="primary"
                onClick={ () => {
                    logoutAction();
                    setLogout({});
                } }
            >
                <LogoutIcon sx={{ mr: 0.5 }} />
                Log out
            </Fab>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>First name</TableCell>
                            <TableCell align="right">Last name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Registered at</TableCell>
                            <TableCell align="right">Confirmed</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userListState.userList.userList.map((row) => (
                            <TableRow
                                key={ row._id }
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    { row.firstName }
                                </TableCell>
                                <TableCell align="right">{ row.lastName }</TableCell>
                                <TableCell align="right">{ row.email }</TableCell>
                                <TableCell align="right">
                                    <Moment date={ row.registeredAt } />
                                </TableCell>
                                <TableCell align="right">
                                    { row.enabled
                                        ? <Chip label="Confirmed" color="success" />
                                        : <Chip label="Not confirmed yet" color="error" />
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        userListState: state.userList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserList: (user) => {
            dispatch(getUserListAction(user));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
