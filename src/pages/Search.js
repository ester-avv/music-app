import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    search: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { search } = this.state;
    const minLogin = 1;
    return (
      <div data-testid="page-search">
        <Header />
        <h2>Search</h2>
        <label htmlFor="search">
          Pesquise aqui:
          <input
            data-testid="search-artist-input"
            type="text"
            name="search"
            id="search"
            onChange={ this.handleChange }
            value={ search }
          />
        </label>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ search.length <= minLogin }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}
