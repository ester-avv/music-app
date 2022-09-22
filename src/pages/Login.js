import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends Component {
  state = {
    nameLogin: '',
    isLoading: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  loginUser = async () => {
    const { nameLogin } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });
    await createUser({ name: nameLogin });
    history.push('/search');
  };

  render() {
    const { nameLogin, isLoading } = this.state;
    const minLogin = 2;

    return (
      <div data-testid="page-login">
        <h1> Trybetunes </h1>
        { isLoading
          ? <Loading />
          : (
            <div>
              <label htmlFor="nameLogin">
                Username
                <input
                  type="text"
                  value={ nameLogin }
                  name="nameLogin"
                  onChange={ this.handleChange }
                  data-testid="login-name-input"
                />
              </label>

              <button
                type="submit"
                name="login"
                data-testid="login-submit-button"
                disabled={ nameLogin.length <= minLogin }
                onClick={ this.loginUser }
              >
                Entrar
              </button>
            </div>
          )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
