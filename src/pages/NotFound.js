import React from 'react';
import logo from '../imagem/logologin.png';

export default class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <div className="mx-auto mb-3">
          <img src={ logo } alt="logo trybetunes" className="mb-5 mx-auto logo " />
          <div className="error">
            <h1 className="title-error">OPS!</h1>
            <p className="description-error">
              A página que você está procurando não foi encontrada
            </p>
          </div>
        </div>
      </div>
    );
  }
}
