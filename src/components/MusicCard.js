import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  state = {
    mySongs: [],
  };

  componentDidMount() {
    this.fixState();
  }

  fixState = () => {
    const { songs } = this.props;
    this.setState({ mySongs: songs });
  };

  render() {
    const { mySongs } = this.state;
    return (
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
          </div>
        ))}
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
