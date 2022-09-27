import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
/* import Loading from '../components/Loading'; */

export default class Favorites extends Component {
  state = {
    songs: [],
  };

  async componentDidMount() {
    const myFavorites = await getFavoriteSongs();
    this.setState({ songs: myFavorites });
  }

  async shouldComponentUpdate(nextProp, nextState) {
    const myFavorites = await getFavoriteSongs();
    return myFavorites !== nextState.songs;
  }

  async componentDidUpdate() {
    const myFavorites = await getFavoriteSongs();
    this.setState({ songs: myFavorites });
  }

  render() {
    const { songs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />

        <section>
          <h1>Músicas Favoritas</h1>
          <MusicCard
            songs={ songs }
          />
        </section>

      </div>
    );
  }
}
