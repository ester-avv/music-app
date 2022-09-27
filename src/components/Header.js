import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    user: '',
    isLoading: false,
  };

  componentDidMount() {
    this.showUserName();
  }

  showUserName = () => {
    this.setState(
      { isLoading: true },
      async () => {
        const userDetails = await getUser();
        const { name } = userDetails;
        this.setState({
          user: name,
          isLoading: false,
        });
      },
    );
  };

  render() {
    const { user, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        { isLoading
          ? <Loading />
          : (
            <p data-testid="header-user-name">
              {user}
            </p>
          )}
        <h1>Trybetunes!</h1>
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link
          data-testid="link-to-favorites"
          to="/favorites"
        >
          Musicas Favoritas
        </Link>
        <Link data-testid="link-to-profile" to="/profile">Meu Perfil</Link>

      </header>
    );
  }
}
