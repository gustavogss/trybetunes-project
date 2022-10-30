import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class AlbumCard extends React.Component {
  render() {
    const { album:
      { collectionId, artworkUrl100, collectionName } } = this.props;
    return (
      <div className="card-album">

        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img alt="Album Cover" src={ artworkUrl100 } />
          <h6 className="collection-name">{ collectionName }</h6>
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    collectionId: PropTypes.number,
    artworkUrl100: PropTypes.string,
    collectionName: PropTypes.string,
    artistName: PropTypes.string,
  }).isRequired,
};
