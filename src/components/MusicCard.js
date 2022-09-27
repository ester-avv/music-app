import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
/* import getMusics from '../services/musicsAPI'; */
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    isLoading: true,
    favorites: [],
  };

  async componentDidMount() {
    const myFavorites = await getFavoriteSongs();
    /* const { songs } = this.props; */
    this.setState({
      favorites: myFavorites,
      isLoading: false,
    });
  }

  /*   fixState = () => {
    const { songs } = this.props;
    this.setState({ mySongs: songs });
  }; */

  updateFavorites = async () => {
    const myFavorites = await getFavoriteSongs();
    this.setState({ favorites: myFavorites });
  };

  handleChange = async (e) => {
    /* console.log('quem é', e); */
    this.setState({ isLoading: true });

    const { favorites } = this.state;

    const existe = favorites.some((el) => el.trackId === e.trackId);

    if (existe) {
      await removeSong(e);
      await this.updateFavorites();
      this.setState({
        isLoading: false,
      });
    } else {
      await addSong(e);
      await this.updateFavorites();
      this.setState({
        isLoading: false,
      });
    }
  };

  /* change = async (e) => {
    /* console.log('quem é', e); */
  /* this.setState({ isLoading: true });

    await addSong(e);

    await this.updateFavorites();
    this.setState({
      isLoading: false, */
  /* });
  }; */

  render() {
    const { isLoading, favorites } = this.state;
    const { songs } = this.props;
    /* console.log('favorites', favorites); */

    return (
      <div>
        {isLoading
          ? <Loading />
          : (
            <div>
              { songs.map((musica) => (
                <div key={ musica.trackId }>
                  <h3>
                    {' '}
                    {musica.trackName}
                  </h3>
                  <audio data-testid="audio-component" src="{e.previewUrl}" controls>
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    {' '}
                    <code>audio</code>
                    .
                  </audio>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  {' '}
                  <code>audio</code>
                  <br />

                  <label
                    htmlFor={ musica.trackId }
                  >
                    Favorita
                    <input
                      data-testid={ `checkbox-music-${musica.trackId}` }
                      type="checkbox"
                      id={ musica.trackId }
                      onChange={ () => this.handleChange(musica) }
                      checked={ favorites
                        .some((song) => musica.trackId === song.trackId) }
                    />
                  </label>

                </div>
              ))}
            </div>
          )}

      </div>
    );
  }
}

MusicCard.propTypes = {
  songs: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;
