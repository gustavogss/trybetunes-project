import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = async () => {
    const { name, email, image, description } = await getUser();
    this.setState({ loading: false, name, email, image, description });
  }

  render() {
    const { loading, name, email, image, description } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { (loading) ? <Loading /> : (
          <div className="container mx-auto card-profile position-card">
            <img data-testid="profile-image" src={ image } alt={ name } />
            <h2 className="form-control">{ name }</h2>
            <h3 className="form-control">{ email }</h3>
            <p className="form-control">{ description }</p>
            <Link to="/profile/edit" className="btn btn-primary">Editar perfil</Link>
          </div>
        ) }
      </div>
    );
  }
}
