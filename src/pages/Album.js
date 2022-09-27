import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
/* import BrowserRouter from 'react-router-dom'; */

export default class Album extends Component {
  state = {
    songs: [],
    myAlbum: '',
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    this.getCollectionId();
    const myAlbumSongs = await this.getAlbumSongs();
    const mySongs = await myAlbumSongs.filter((_element, index) => index > 0);
    /*  console.log('tudo', myAlbumSongs);
    console.log('só as musicas', mySongs); */
    /* const allSongs = await myAlbumSongs; */
    this.setState({ songs: mySongs, myAlbum: myAlbumSongs[0], isLoading: false });
  }

  getCollectionId = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    /*  const type = typeof (id);
    console.log('id', type); */
    return id;
  };

  getAlbumSongs = async () => {
    const myId = this.getCollectionId();
    const albumSongs = await getMusics(myId);
    /*  console.log('musicas', albumSongs); */
    return albumSongs;
  };

  render() {
    /* console.log(this.props); */
    const { songs, myAlbum, isLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { isLoading
          ? <Loading />
          : (
            <div>
              <section>
                <div>
                  <h1 data-testid="artist-name">
                    {' '}
                    { myAlbum.artistName }
                    {' '}
                  </h1>
                  <h2 data-testid="album-name">
                    { myAlbum.collectionName }
                  </h2>
                </div>
              </section>
              <MusicCard
                songs={ songs }
              />
            </div>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string }) }),
}.isRequired;
