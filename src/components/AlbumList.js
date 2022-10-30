import React from 'react';
import PropTypes from 'prop-types';
import AlbumCard from './AlbumCard';

export default class AlbumList extends React.Component {
  render() {
    const { albuns, artist } = this.props;
    return (
      <div className="container row mx-auto">
        <p>
          Resultado de álbuns de:
          {' '}
          {artist}
        </p>
        {albuns.map((album) => (
          <AlbumCard key={ album.collectionId } album={ album } />
        ))}
      </div>
    );
  }
}

AlbumList.propTypes = {
  albuns: PropTypes.arrayOf(PropTypes.object).isRequired,
  artist: PropTypes.string.isRequired,
};
