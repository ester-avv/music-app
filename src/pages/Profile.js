import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Profile extends Component {
  state = {
    isLoading: true,
    user: [],
  };

  componentDidMount() {
    this.saveUser();
  }

  saveUser = async () => {
    const info = await getUser();
    console.log(info);
    this.setState({
      user: info,
      isLoading: false,
    });
  };

  render() {
    const { isLoading, user: { name, email, image, description } } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { isLoading ? <Loading /> : (
          <div>
            <h3>
              { name }
            </h3>
            <img
              data-testid="profile-image"
              src={ image }
              alt="Foto de Perfil"
            />
            <p>
              {description}
            </p>
            <p>
              {email}
            </p>
            <button type="button">
              <Link to="/profile/edit"><p>Editar perfil</p></Link>
            </button>
          </div>
        )}
      </div>
    );
  }
}
