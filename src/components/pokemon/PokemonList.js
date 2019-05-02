import React, { Component } from 'react';
import axios from 'axios';

import PokemonCard from './PokemonCard';

export default class PokemonList extends Component {
  state = {
    url: "http://localhost:4000/v1/pokemon",
    pokemons: null
  };

  async componentDidMount() {
    const response = await axios.get(this.state.url);
    this.setState({ pokemons: response.data })
  }
  
  render() {
    return (
      <React.Fragment>
        { this.state.pokemons ? (
          <div className="row">
            {this.state.pokemons.map(pokemon => (
              <PokemonCard
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                spriteUrl={pokemon.sprite_url}
              />
            ))}
          </div>) : (
            <h1>Loading Pokemon</h1>
          )
        }
      </React.Fragment>
    )
  }
}