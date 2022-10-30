import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import logo from '../imagem/logologin.png';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      loading: false,
      redirected: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { userName } = this.state;
    this.setState(
      {
        loading: true,
        redirected: false,
      },
      async () => {
        await createUser({ name: userName });
        this.setState({
          loading: false,
          redirected: true,
        });
      },
    );
  }

  render() {
    const { userName, loading, redirected } = this.state;
    const MIN_SIZE_CHARACTER = 3;

    if (loading) return <Loading />;
    if (redirected) return <Redirect to="/search" />;
    return (
      <div data-testid="page-login" className="login-content d-flex align-items-center">
        <form className="mx-auto login form-control mb-3">
          <img src={ logo } alt="logo trybetunes" className="mb-5 mx-auto logo " />

          <input
            type="text"
            name="userName"
            id="login-name-input"
            value={ userName }
            data-testid="login-name-input"
            onChange={ this.handleInputChange }
            placeholder="Nome:"
            className="form-control input-search mb-3"
          />

          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ userName.length < MIN_SIZE_CHARACTER }
            onClick={ this.handleClick }
            className="btn btn-success container"
          >
            Entrar
          </button>
          <p className="mt-5 mb-3 text-center link-decoration">
            GustavoSouza&copy;Turma 15 B
          </p>
        </form>
      </div>
    );
  }
}
