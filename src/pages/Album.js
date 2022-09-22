import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
/* import BrowserRouter from 'react-router-dom'; */

export default class Album extends Component {
  render() {
    const { id } = this.props;
    return (
      <div data-testid="page-album">
        <Header />
        <h1>
          Album
          {' '}
          { id }
          {' '}
        </h1>
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string.isRequired,
};
