import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
/* import getMusics from '../services/musicsAPI'; */
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    mySongs: [],
    isLoading: false,
    favorites: [],
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const myFavorites = await getFavoriteSongs();
    this.fixState();
    this.setState({
      favorites: myFavorites,
      isLoading: false });
  }

  fixState = () => {
    const { songs } = this.props;
    this.setState({ mySongs: songs });
  };

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
    const { mySongs, isLoading, favorites } = this.state;
    console.log('favorites', favorites);

    return (
      <div>
        {isLoading
          ? <Loading />
          : (
            <div>
              { mySongs.map((musica) => (
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
    artistId: PropTypes.string,
    artistName: PropTypes.string,
    artistViewUrl: PropTypes.string,
    artworkUrl30: PropTypes.string,
    artworkUrl60: PropTypes.string,
    artworkUrl100: PropTypes.string,
    collectionCensoredName: PropTypes.string,
    collectionExplicitness: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    collectionPrice: PropTypes.number,
    collectionViewUrl: PropTypes.string,
    country: PropTypes.string,
    currency: PropTypes.string,
    discCount: PropTypes.number,
    discNumber: PropTypes.number,
    isStreamable: PropTypes.bool,
    kind: PropTypes.string,
    previewUrl: PropTypes.string,
    primaryGenreName: PropTypes.string,
    releaseDate: PropTypes.string,
    trackCensoredName: PropTypes.string,
    trackCount: PropTypes.number,
    trackExplicitness: PropTypes.string,
    trackId: PropTypes.number,
    trackName: PropTypes.string,
    trackNumber: PropTypes.number,
    trackPrice: PropTypes.number,
    trackTimeMillis: PropTypes.number,
    trackViewUrl: PropTypes.string,
    wrapperType: PropTypes.string,
  }).isRequired,
};
