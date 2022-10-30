import React from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    const { selected } = props;
    this.state = {
      checked: selected,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const { handleFavorites } = this.props;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
    handleFavorites(target.checked, this.props);
  }

  render() {
    const { endPoint, trackName, trackId } = this.props;
    const { checked } = this.state;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ endPoint } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
          Favorita &nbsp;

          <input
            type="checkbox"
            name="checked"
            checked={ checked }
            id={ trackId }
            onChange={ this.handleChange }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = PropTypes.shape({
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
}).isRequired;
