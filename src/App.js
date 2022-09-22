import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import Edit from './pages/Edit';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { createUser } from './services/userAPI';
import Loading from './Loading';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      nameLogin: '',
      loginButtonDisabled: true,
      loading: true,
      userName: '',
      savedUserName: false,
    };
  }

  handleDisabledButton = () => {
    const { nameLogin } = this.state;
    const minLogin = 3;
    const validString = nameLogin.length >= minLogin;

    this.setState({
      loginButtonDisabled: !validString,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => {
      this.handleDisabledButton();
    });
  };

  loginUser() {
    this.setState(
      { loading: true },
      () => {
        const user = createUser({ name: nameLogin });
        this.setState({
          userName: user,
          savedUserName: true,
        });
      },
    );
  }

  render() {
    const { nameLogin,
      loading,
      userName,
      savedUserName,
      loginButtonDisabled } = this.state;
    return (
      <BrowserRouter>
        <h1>Trybetunes</h1>
        <Switch>
          <Route path="/search">
            {loading
              ? <Redirect to="/loading" />
              : (
                <Search
                  userName={ userName }
                />
              )}
          </Route>

          <Route path="/album/:id" component={ Album } />

          <Route path="/loading" component={ Loading } />

          <Route path="/favorites" component={ Favorites } />

          <Route exact path="/profile" component={ Profile } />

          <Route path="/profile/edit" component={ Edit } />

          <Route exact path="/">
            { savedUserName
              ? <Redirect to="/search" />
              : (
                <Login
                  nameLogin={ nameLogin }
                  handleChange={ this.handleChange }
                  loginButtonDisabled={ loginButtonDisabled }
                  loginUser={ this.loginUser }
                />)}
          </Route>
          <Route path="/" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
