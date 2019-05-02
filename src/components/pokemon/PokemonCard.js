import React, { Component } from 'react';

import styled from 'styled-components';
import loadingSpinner from '../../assets/loading-spinner.gif'

export default class PokemonCard extends Component {
  state = {
    id: '',
    name: '',
    spriteUrl: '',
    spriteLoading: true,
  };

  componentDidMount() {
    const { id, name, spriteUrl } = this.props;
    this.setState({
      id,
      name,
      spriteUrl,
    })
  }

  getSpriteUrl() {
    return `http://localhost:4000${this.state.spriteUrl}`;
  }

  render() {
    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <Card className="card">
          <h5 className="card-header">#{this.state.id}</h5>

          { this.state.spriteLoading ? (
            <img
              src={loadingSpinner}
              style={{width: '5em', height: '5em'}}
              className="card-img-top rounded mx-auto d-block mt-2"
            />
          ) : null }
          <Sprite
            className="card-img-top rounded mx-auto mt-2"
            src={this.getSpriteUrl()}
            onLoad={() => this.setState({ spriteLoading: false })}
            style={
              this.state.spriteLoading ? { display: 'none'} : null
            }>
          </Sprite>

          <div className="card-body mx-auto">
            <h6 className="card-body">{this.state.name}</h6>
          </div>
        </Card>
      </div>
    )
  }
}

const Sprite = styled.img`
  width: 5em;
  height: 5em;
`

const Card = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`