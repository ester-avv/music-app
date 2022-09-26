import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    search: '',
    albuns: [],
    isLoading: false,
    wantedName: '',
  };

  /*  componentDidMount() {
    this.fetchAlbuns();
  } */

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  /* handleClick = () => {
    const { search, albuns } = this.state;

    const foundAlbuns = albuns
      .filter((element) => element.collectionName.includes(search));

    const appearingAlbuns = foundAlbuns.map((element) => ({
      album: element.collectionName,
      id: element.collectionId,
      image: element.artworkUrl100,
      artist: element.artistName }));

    console.log('appearing', appearingAlbuns);

    this.setState({
      search: '',
      filteredAlbuns: appearingAlbuns,
      isLoading: false,
    });
  }; */

  fetchAlbuns = () => {
    const { search } = this.state;
    this.setState(
      { isLoading: true,
        wantedName: search,
      },
      async () => {
        const albuns = await searchAlbumsAPI(search);
        console.log(albuns);
        this.setState({
          albuns,
          isLoading: false,
          search: '' });
      },
    );
  };

  render() {
    const { search, albuns, isLoading, wantedName } = this.state;
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
          onClick={ this.fetchAlbuns }
        >
          Pesquisar
        </button>

        <section>
          { isLoading && <Loading /> }
          { albuns.length === 0
            ? <p> Nenhum álbum foi encontrado </p>
            : (
              <div>
                Resultado de álbuns de:
                {' '}
                { wantedName }
                { albuns.map((element) => (
                  <div key={ element.collectionId }>
                    <Link
                      data-testid={ `link-to-album-${element.collectionId}` }
                      to={ `/album/${element.collectionId}` }
                    >
                      <h3>{ element.collectionName }</h3>
                      <img src={ element.artworkUrl100 } alt={ element.collectionName } />
                    </Link>
                  </div>))}
              </div>
            )}
        </section>

      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
