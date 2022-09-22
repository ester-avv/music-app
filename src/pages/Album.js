import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* import BrowserRouter from 'react-router-dom'; */

export default class Album extends Component {
  render() {
    const { id } = this.props;
    return (
      <div data-testid="page-album">
        {' Album '}
        {id}
        {' '}
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string.isRequired,
};
