import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { songs } = this.props;
    console.log(songs);
    return (
      <section data-testid="artist-name">
        {songs.map((element) => (
          <div key={ element.trackId }>
            <h3>
              { element.trackName }
            </h3>
          </div>
        ))}
      </section>
    );
  }
}

MusicCard.propTypes = {
  songs: PropTypes.any.isRequired,
};
