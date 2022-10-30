import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';

export default class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      login: true,
      loading: true,
      album: false,
      musicAPI: false,
      musicFavorite: false,
    };

    this.requestApiMusic = this.requestApiMusic.bind(this);
    this.musicFavorite = this.musicFavorite.bind(this);
    this.handleFavorites = this.handleFavorites.bind(this);
    this.handleMusics = this.handleMusics.bind(this);
  }

  componentDidMount() {
    this.requestApiMusic();
    this.musicFavorite();
  }

  handleMusics() {
    const { loading, album, musicAPI, musicFavorite, favoriteSongs } = this.state;
    if (loading) return <Loading />;
    if (musicAPI && musicFavorite) {
      return (
        <div className="container mx-auto card position-card">
          <h2 data-testid="artist-name" className="card-title">{album[0].artistName}</h2>
          <img
            src={ album[0].artworkUrl100 }
            alt="album-cover"
            className="card-album"
          />
          <h3 data-testid="album-name">{album[0].collectionName}</h3>
          { album.map((music, element) => element !== 0 && (
            <MusicCard
              selected={ favoriteSongs.some(
                (favorite) => favorite.trackId === music.trackId,
              ) }
              key={ music.trackId }
              previewUrl={ music.previewUrl }
              trackName={ music.trackName }
              trackId={ music.trackId }
              music={ music }
              handleFavorites={ this.handleFavorites }

            />
          ))}
        </div>
      );
    }
  }

  async handleFavorites(checked, obj) {
    this.setState({
      loading: true,
    });
    await (checked ? addSong(obj) : removeSong(obj));
    this.musicFavorite();
  }

  async musicFavorite() {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs,
      loading: false,
      musicFavorite: true,
    });
  }

  async requestApiMusic() {
    const { match: { params: { id } } } = this.props;
    this.setState({
      loading: true,
    });
    const musicList = await getMusics(id);
    this.setState({
      login: false,
      loading: false,
      album: musicList,
      musicAPI: true,
    });
  }

  render() {
    const { login } = this.state;
    if (login) return <Loading />;
    return (
      <div data-testid="page-album">
        <Header />
        { this.handleMusics() }
      </div>
    );
  }
}

Album.propTypes = PropTypes.shape({
  match: { params: { id: PropTypes.number } },
}).isRequired;
