import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
/* import getMusics from '../services/musicsAPI'; */
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    mySongs: [],
    isLoading: false,
    isChecked: false,
    favorites: [],
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const myFavorites = await getFavoriteSongs();
    this.fixState();
    this.setState({
      favorites: [...myFavorites],
      isLoading: false });
  }

  fixState = () => {
    const { songs } = this.props;
    this.setState({ mySongs: songs });
  };

  handleChange = async ({ target }) => {
    const { mySongs } = this.state;
    const { id } = target;
    console.log(id);
    const favoriteSongs = mySongs.filter((e) => Number(id) === e.trackId);
    this.setState({ favorites: [...favorites, ...favoriteSongs] });
  };

  render() {
    const { mySongs, isLoading, isChecked } = this.state;

    return (
      <div>
        {isLoading
          ? <Loading />
          : (
            <div>
              { mySongs.map((e) => (
                <div key={ e.trackId }>
                  <h3>
                    {' '}
                    {e.trackName}
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
                    data-testid={ `checkbox-music-${e.trackId}` }
                    htmlFor={ e.trackId }
                  >
                    Favorita
                    <input
                      type="checkbox"
                      id={ e.trackId }
                      onChange={ this.handleChange }
                      checked={ isChecked }
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
