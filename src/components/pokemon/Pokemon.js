import React, { Component } from 'react';
import axios from 'axios';

export default class Pokemon extends Component {  
  state = {
    id: '',
    name: '',
    spriteUrl: '',
    evolutionChainId: '',
    types: [],
    evolvesTo: []
  };

  getSpriteUrl = (path = '') => {
    if (path) {
      return `http://localhost:4000${path}`;
    }
    return `http://localhost:4000${this.state.spriteUrl}`;
  }

  renderEvolutions = (evolutions) => {
    return (
      <React.Fragment>
        { evolutions.map(evolution => {
          return (
            <div key={evolution.id}>
              <img 
                src={this.getSpriteUrl(evolution.sprite_url)}
                alt={`${evolution.name} sprite`}
              />
              <span>{evolution.name}</span>
              { this.renderEvolutions(evolution.evolves_to) }
            </div>
          );
        })}
      </React.Fragment>
    );
  }

  renderEvolutionChain = () => {
    return (
      <div>
        <img 
          src={this.getSpriteUrl()}
          alt={`${this.state.name} sprite`}
        /> 
        <span>{this.state.name}</span>
        {this.renderEvolutions(this.state.evolvesTo)}
      </div>
    );
  }

  renderTypes = () => {
    return(
      <React.Fragment>
        { this.state.types.map(type => (
          <span 
            key={type.id} 
            className="badge badge-primary badge-pill mr-1"
            style={{ 
              backgroundColor: `#${TYPE_COLORS[type.name]}`,
              color: 'white', 
            }}
          >
            {type.name}
          </span>
        ))}
      </React.Fragment>
    );
  }

  removePokemon = async () => {
    const url = `http://localhost:4000/v1/pokemon/${this.state.id}`;
    try {
      await axios.delete(url);
      alert('Pokemon deleted sucessfully.');
      this.props.history.push('/pokemon');      
    } catch (e) {
      alert('Error! ' + e.message);
    }
  }

  componentDidMount = async () => {
    const { id } = this.props.match.params;
    
    const pokemonUrl = `http://localhost:4000/v1/pokemon/${id}`;
    const response = await axios.get(pokemonUrl);
    const { name, types } = response.data;

    const spriteUrl = response.data.sprite_url;
    const evolutionChainId = response.data.evolution_chain_id;
    const evolvesTo = response.data.evolves_to;
    
    this.setState({
      id,
      name,
      spriteUrl,
      evolutionChainId,
      types,
      evolvesTo,
    });
  }
  
  render = () => {
    return (
    <div className="col">
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-5">
              <h5>#{this.state.id}</h5>
            </div>
            <div className="col-7">
              <div className="float-right">
                { this.renderTypes() }
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-3">
              <img 
                src={this.getSpriteUrl()}
                className="card-img-top rounded mx-auto mt-2"
                alt={`${this.state.name} sprite`}
              />
            </div>
            <div className="col-md-9">
              <h4 className="mx-auto">{this.state.name}</h4>
            </div>
          </div>
          <button 
            onClick={() => this.props.history.push(`/pokemon/${this.state.id}/edit`)}>
            Edit Pokemon
          </button>
          <button onClick={this.removePokemon}>Delete Pokemon</button>
        </div>
        <hr />
        <div className="card-body">
          <div className="card-title text-center">Evolutions</div>
          <div className="d-flex justify-content-center">
            { this.renderEvolutionChain() }
          </div>
        </div>
      </div>
    </div>);
  }
}

const TYPE_COLORS = {
  bug: 'B1C12E',
  dark: '4F3A2D',
  dragon: '755EDF',
  eletric: 'FCBC17',
  fairy: 'F4B1F4',
  fighting: '823551',
  fire: 'E73B0C',
  flying: 'A3B3F7',
  ghost: '6060B2',
  grass: '74C236',
  ground: 'D3B357',
  ice: 'A3E7FD',
  normal: 'C8C4BC',
  poison: '934594',
  psychic: 'ED4882',
  rock: 'B9A156',
  steel: 'B5B5C3',
  water: '3295F6',
};