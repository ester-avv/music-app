import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

export default class Favorites extends Component {
  state = {
    favorites: [],
    songs: [],
  };

  async componentDidMount() {
    const myFavorites = await getFavoriteSongs();
    this.setState({ favorites: myFavorites,
      songs: myFavorites });
  }

  render() {
    const { favorites, songs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div>
          {favorites
            ? (
              <section>
                <h1>Músicas Favoritas</h1>
                <MusicCard
                  songs={ songs }
                />
              </section>)
            : <Loading />}
        </div>
      </div>
    );
  }
}
