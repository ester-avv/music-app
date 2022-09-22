import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Search extends Component {
  render() {
    const { userName } = this.props;
    return (
      <div data-testid="page-search">
        <h1>Search</h1>
        <p>
          {' '}
          logado como
          {' '}
          {userName}
          {' '}
        </p>
      </div>
    );
  }
}

Search.propTypes = {
  userName: PropTypes.string.isRequired,
};
