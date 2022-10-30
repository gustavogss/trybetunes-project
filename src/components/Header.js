import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import logo from '../imagem/logoheader.png';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = ({
      name: 'Carregando...',
    });
  }

  componentDidMount() {
    this.userAdd();
  }

  userAdd() {
    getUser()
      .then((param) => this.setState({
        name: param.name,
      }));
  }

  render() {
    const { name } = this.state;
    return (
      <>
        <header data-testid="header-component" className="header">
          <img src={ logo } alt="logo trybetunes" className="mb-5 logo" />
          <div className="user">
            <p data-testid="header-user-name">{name}</p>
          </div>
        </header>
        <nav className="categories">
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>
      </>
    );
  }
}
