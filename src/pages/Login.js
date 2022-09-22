import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Login extends Component {
  render() {
    const { nameLogin,
      handleChange,
      loginButtonDisabled,
      loginUser } = this.props;

    return (
      <div data-testid="page-login">
        <label htmlFor="nameLogin">
          Username
          <input
            type="text"
            value={ nameLogin }
            name="nameLogin"
            onChange={ handleChange }
            data-testid="login-name-input"
          />
        </label>

        <button
          type="submit"
          name="login"
          data-testid="login-submit-button"
          disabled={ loginButtonDisabled }
          onClick={ loginUser }
        >
          Entrar
        </button>

      </div>
    );
  }
}

Login.propTypes = {
  nameLogin: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  loginButtonDisabled: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired,
};

/* loading: PropTypes.bool.isRequired,
userName: PropTypes.string.isRequired,
savedUserName: PropTypes.bool.isRequired, */
