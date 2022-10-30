import React from 'react';
import Loading from '../components/Loading';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      favoriteMusic: [],
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  handleChange = async (_event, song) => {
    this.setState({ loading: true });
    await removeSong(song);
    this.getFavorites();
    this.setState({ loading: false });
  }

  getFavorites = async () => {
    const favoritesList = await getFavoriteSongs();
    this.setState({ loading: false, favoriteMusic: favoritesList });
  }

  render() {
    const { favoriteMusic, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-favorites">
        <Header />
        { favoriteMusic.map((song) => (
          <MusicCard
            key={ song.trackId }
            favoriteMusic={ favoriteMusic }
            song={ song }
            handleChange={ this.handleChange }
          />
        )) }
      </div>
    );
  }
}
