import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import RegistrationConfirmed from './components/Register/RegistrationConfirmed';
import './App.css';

const App = () => {
  return (
      <div className="App">
          <Router>
              <Switch>
                  <Route
                      path={process.env.PUBLIC_URL + '/'}
                      component={Home}
                      exact
                  />
                  <Route
                      path={process.env.PUBLIC_URL + '/login'}
                      component={Login}
                      exact
                  />
                  <Route
                      path={process.env.PUBLIC_URL + '/register'}
                      component={Register}
                      exact
                  />
                  <Route
                      path={process.env.PUBLIC_URL + '/registration-confirmed/:id'}
                      component={RegistrationConfirmed}
                      exact
                  />
              </Switch>
          </Router>
      </div>
  );
}

export default App;
