import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    mySongs: [],
    isLoading: false,
    favorites: [],
    savedFavorites: [],
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const myFavorites = await getFavoriteSongs();
    this.fixState();
    this.setState({
      savedFavorites: [...myFavorites],
      isLoading: false });
  }

  fixState = () => {
    const { songs } = this.props;
    this.setState({ mySongs: songs });
  };

  handleChange = async ({ target }) => {
    const { id, checked } = target;
    /* console.log(id); */
    this.setState({ isLoading: true });
    const songsWithId = await getMusics(id);

    if (checked) {
      await addSong(songsWithId[0]);
      this.setState((lastState) => ({
        isLoading: false,
        favorites: [...lastState.favorites, id],
      }));
    } else {
      await removeSong(songsWithId[0]);
      this.setState((lastState) => ({
        isLoading: false,
        favorites: lastState.favorites.filter((e) => e !== id),
        savedFavorites: lastState.savedFavorites.filter((e) => Number(id) === e.trackId),
      }));
    }
  };

  handleClick = ({ target }) => {
    const { savedFavorites, favorites } = this.state;
    const { id } = target;
    if (savedFavorites[0]) {
      savedFavorites.some((e) => Number(e.trackId) === Number(id));
    } else {
      favorites.includes(id);
    }
    console.log('saved', savedFavorites);
  };

  render() {
    const { mySongs, isLoading } = this.state;

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
                      onClick={ this.handleClick }
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
