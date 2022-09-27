import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getUser from '../services/userAPI';

export default class Profile extends Component {
  state = {
    user: {},
    isLoading: false,
  };

  async componentDidMount() {
    /* this.setState({ isLoading: true }); */
    const myData = await getUser();
    this.setState({
      user: myData,
      isLoading: false,
    });
  }

  render() {
    const { user: { name, email, image, description }, isLoading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { isLoading ? <Loading />
          : (
            <div>
              <h3>
                Nome:
                {' '}
                {name}
              </h3>
              <img data-testid="profile-image" src={ image } alt={ name } />
              <p>
                Email:
                {' '}
                {email}
              </p>
              <p>
                Quem sou:
                {' '}
                {description}
              </p>
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          )}

      </div>
    );
  }
}
