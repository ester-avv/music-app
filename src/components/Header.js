import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    userName: '',
    isLoading: false,
  };

  componentDidMount() {
    this.showUserName();
  }

  showUserName = () => {
    this.setState(
      { isLoading: true },
      async () => {
        const userName = await getUser();
        this.setState({
          userName,
          isLoading: false,
        });
      },
    );
  };

  render() {
    const { userName, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        <h1>Trybetunes!</h1>

        { isLoading
          ? <Loading />
          : (
            <p>
              {`Olá, ${userName.name}`}
            </p>)}

      </header>
    );
  }
}
