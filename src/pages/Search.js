import React from 'react';
import AlbumList from '../components/AlbumList';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      searchSave: '',
      loading: false,
      albuns: [],
    };
    this.listAlbuns = this.listAlbuns.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async handleClick() {
    const { artist } = this.state;
    this.setState({
      searchSave: artist,
      loading: true,
    });
    const artists = await searchAlbumsAPI(artist);
    this.setState({
      artist: '',
      loading: false,
      albuns: artists,
    });
  }

  handleSearch() {
    const { searchSave, albuns } = this.state;
    return (
      <div className="text-center my-5">
        { albuns.length === 0 ? <h4>Nenhum álbum foi encontrado</h4>
          : <AlbumList albuns={ albuns } artist={ searchSave } /> }
      </div>
    );
  }

  listAlbuns() {
    const { artist } = this.state;
    const MIN_SIZE_CHARACTER = 2;
    return (
      <div>
        <form className="mx-auto search">
          <input
            data-testid="search-artist-input"
            type="text"
            id="search-artist-input"
            name="artist"
            value={ artist }
            placeholder="Insira o nome do artista ou banda"
            onChange={ this.handleInputChange }
            className="form-control input-search"
          />

          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ artist.length < MIN_SIZE_CHARACTER }
            onClick={ this.handleClick }
            className="btn btn-success"
          >
            Pesquisar
          </button>
        </form>
        <div>
          {this.handleSearch()}
        </div>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading /> : this.listAlbuns() }
      </div>
    );
  }
}
